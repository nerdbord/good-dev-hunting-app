"use client"

// import { fetchMyAvatar } from '@/app/[locale]/(auth)/_actions/mutations/fetchMyAvatar'
import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { Avatar, Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
// import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'
// import GithubUserPhotoUploader from './GithubUserPhotoUploader'
import styles from './CvUploader.module.scss'

export const CvUploader = () => {
    const t = useTranslations(I18nNamespaces.Buttons)
//   const { data: session } = useSession()
  const [cvFile, setCvFile] = useState<string | null>(null)
  const { fileUploadError, setFileUploadError, setFormDataWithFile } =
    useUploadContext()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileUploadError(false)
    const file = event.target.files?.[0]

    if (file && file.type.match(/image-*/)) {
      if (file.size <= 4 * 1024 * 1024) {
        const form = new FormData()
        form.append('fileUpload', file)

        setFormDataWithFile(form)

        const reader = new FileReader()
        reader.onloadend = () => {
          setCvFile(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setFileUploadError(true)
        setErrorMsg('Choose file smaller than 4MB')
      }
    } else {
      setFileUploadError(true)
      setErrorMsg('File failed to upload, try again')
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

    return(<div className={styles.container}>
        <p className={styles.containerLabel}>Picture (optional)</p>
        <div className={styles.errorMessageWrapper}>
          {fileUploadError && (
            <div className={styles.errorMessage}>
              <ErrorIcon />
              {errorMsg}
            </div>
          )}
          <div className={styles.contentWrapper}>
            {cvFile && <Avatar src={cvFile || ''} size={100} />}
            <div className={styles.buttonsWrapper}>
              <Button variant="secondary">
                <label htmlFor="file-input">
                  <input
                    ref={fileInputRef}
                    id="file-input"
                    name='file'
                    type="file"
                    className={styles.hidden}
                    onChange={handleFileChange}
                    multiple={false}
                    accept="image/*"
                  />
                  {t('changePicture')}{' '}
                </label>
              </Button>
              {/* <GithubUserPhotoUploader
                setImage={setUserImage}
                showError={setImageUploadError}
              /> */}
            </div>
          </div>
        </div>
      </div>)
}