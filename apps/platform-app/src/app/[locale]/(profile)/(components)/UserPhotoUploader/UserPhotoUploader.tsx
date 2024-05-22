'use client'
import { fetchMyAvatar } from '@/app/[locale]/(auth)/_actions/mutations/fetchMyAvatar'
import { ErrorIcon } from '@/assets/icons/ErrorIcon'
import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n'
import { Avatar, Button } from '@gdh/ui-system'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import GithubUserPhotoUploader from './GithubUserPhotoUploader'
import styles from './UserPhotoUploader.module.scss'

export const UserPhotoUploader = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const { data: session } = useSession()
  const [userImage, setUserImage] = useState<string | null>(null)
  const { imageUploadError, setImageUploadError, setFormDataWithFile } =
    useUploadContext()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function fetchAvatar() {
      const url = (await fetchMyAvatar()) || session?.user.image
      url && setUserImage(url)
    }
    fetchAvatar()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploadError(false)
    const file = event.target.files?.[0]

    if (file && file.type.match(/image-*/)) {
      if (file.size <= 4 * 1024 * 1024) {
        const form = new FormData()
        form.append('fileUpload', file)

        setFormDataWithFile(form)

        const reader = new FileReader()
        reader.onloadend = () => {
          setUserImage(reader.result as string)
        }
        reader.readAsDataURL(file)
      } else {
        setImageUploadError(true)
        setErrorMsg('Choose picture smaller than 4MB')
      }
    } else {
      setImageUploadError(true)
      setErrorMsg('Picture failed to upload, try again')
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>Picture</p>
      <div className={styles.errorMessageWrapper}>
        {imageUploadError && (
          <div className={styles.errorMessage}>
            <ErrorIcon />
            {errorMsg}
          </div>
        )}
        <div className={styles.contentWrapper}>
          {userImage && <Avatar src={userImage || ''} size={100} />}
          <div className={styles.buttonsWrapper}>
            <Button variant="secondary">
              <label htmlFor="file-input">
                <input
                  ref={fileInputRef}
                  id="file-input"
                  type="file"
                  className={styles.hidden}
                  onChange={handleFileChange}
                  multiple={false}
                  accept="image/*"
                />
                {t('changePicture')}{' '}
              </label>
            </Button>
            <GithubUserPhotoUploader
              setImage={setUserImage}
              showError={setImageUploadError}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
