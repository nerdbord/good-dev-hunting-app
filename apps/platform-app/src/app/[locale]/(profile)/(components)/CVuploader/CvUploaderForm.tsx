'use client'

import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { useUploadContext } from '@/contexts/UploadContext'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
import { useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import { removeMyCv } from '../../_actions/mutations/removeMyCv'
import type { CreateProfileFormValues } from '../../profile.types'
import styles from './CvUploaderForm.module.scss'

type Props = {
  btnVariant?: 'primary' | 'secondary'
}

export function CVuploaderForm({ btnVariant = 'secondary' }: Props) {
  const { cvUploadError, onSetCvUploadError, onSetCvFormData, cvFormData } =
    useUploadContext()
  const { values, isSubmitting, setFieldValue } =
    useFormikContext<CreateProfileFormValues>()
  const cvUrl = values.cvUrl
  const t = useTranslations(I18nNamespaces.Buttons)
  const tt = useTranslations(I18nNamespaces.PersonalInfo)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const [uploadedCVurl, setUploadedCVurl] = useState<{
    name: string
    url: string
  } | null>(null)

  const { runAsync, loading: isRemoving } = useAsyncAction()
  const { addToast } = useToast()

  useEffect(() => {
    // Check if we have a CV URL from Formik values
    if (cvUrl) {
      if (uploadedCVurl?.url !== cvUrl) {
        setUploadedCVurl({ name: tt('choosenCVfileName'), url: cvUrl })
      }
    }
    // Check if we have cvFormData with existingCvUrl (initialized from profile)
    else if (cvFormData && cvFormData.has('existingCvUrl')) {
      const existingUrl = cvFormData.get('existingCvUrl') as string
      if (uploadedCVurl?.url !== existingUrl) {
        setUploadedCVurl({ name: tt('choosenCVfileName'), url: existingUrl })
        // Update Formik's cvUrl value to match the existingCvUrl
        if (!cvUrl) {
          setFieldValue('cvUrl', existingUrl)
        }
      }
    } else {
      if (uploadedCVurl !== null) {
        setUploadedCVurl(null)
      }
    }
  }, [cvUrl, tt, cvFormData, setFieldValue])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetCvUploadError('')
    setErrorMsg(null)
    const file = event.target.files?.[0]

    try {
      if (!file || !file.type) {
        return
      }

      if (file.type !== 'application/pdf') {
        throw new Error('Only PDF files are supported')
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('Choose a file smaller than 5MB')
      }

      const formData = new FormData()
      formData.append('cvFileUpload', file)
      onSetCvFormData(formData)
      setIsUploading(true)

      const objectUrl = URL.createObjectURL(file)
      setUploadedCVurl({ name: file.name, url: objectUrl })

      setFieldValue('cvUrl', objectUrl)
    } catch (error) {
      onSetCvUploadError('Error during file upload.')
      setErrorMsg((error as Error).message)
      setUploadedCVurl(null)
      setFieldValue('cvUrl', null)
      onSetCvFormData(new FormData())
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveCV = async () => {
    onSetCvUploadError('')
    setErrorMsg(null)
    await runAsync(async () => {
      await removeMyCv()
      setUploadedCVurl(null)
      setFieldValue('cvUrl', null)
      onSetCvFormData(new FormData())
      addToast('CV removed successfully', ToastStatus.SUCCESS)
    })
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div>
      <div className={styles.errorMessageWrapper}>
        {cvUploadError && (
          <div className={styles.errorMessage}>
            <ErrorIcon />
            {errorMsg}
          </div>
        )}

        <div className={styles.contentWrapper}>
          {uploadedCVurl && (
            <div className={styles.choosenFile}>
              <p>
                <a
                  href={uploadedCVurl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {uploadedCVurl.name}
                </a>
              </p>
            </div>
          )}
          <div className={styles.buttonsWrapper}>
            <input
              type="file"
              name="cvFileUpload"
              accept=".pdf"
              id="cv-file-input"
              ref={fileInputRef}
              multiple={false}
              className={styles.hidden}
              onChange={handleFileChange}
            />
            <Button
              variant={btnVariant}
              disabled={isUploading || isSubmitting || isRemoving}
              type="button"
              onClick={handleButtonClick}
            >
              {isUploading
                ? t('importing')
                : uploadedCVurl
                ? t('uploadAnotherCVfile')
                : t('uploadCVfile')}
            </Button>
            {uploadedCVurl && (
              <Button
                variant={'secondary'}
                disabled={isRemoving || isUploading || isSubmitting}
                loading={isRemoving}
                type="button"
                onClick={handleRemoveCV}
              >
                {t('removeCVfile')}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
