'use client'

import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './CvUploaderForm.module.scss'

interface CvUploaderFormProps {
  initialCvUrl: string | null
}

export function CVuploaderForm({ initialCvUrl }: CvUploaderFormProps) {
  const t = useTranslations(I18nNamespaces.Buttons)
  const tt = useTranslations(I18nNamespaces.PersonalInfo)
  const [isUploading, setIsUploading] = useState(false)

  const [uploadedCVurl, setUploadedCVurl] = useState<{
    name: string
    url: string
  } | null>(
    initialCvUrl ? { name: tt('choosenCVfileName'), url: initialCvUrl } : null,
  )

  const { cvUploadError, onSetCvUploadError, onSetCvFormData } =
    useUploadContext()

  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetCvUploadError('')
    const file = event.target.files?.[0]

    try {
      if (!file || !file.type) {
        return null
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
      setUploadedCVurl({
        name: file.name,
        url: URL.createObjectURL(file),
      })
    } catch (error) {
      onSetCvUploadError('Error during file upload.')
      setErrorMsg((error as Error).message)
    } finally {
      setIsUploading(false)
    }
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

        {uploadedCVurl && (
          <div className={styles.choosenFile}>
            <p>
              <span>{tt('choosenCVfile')}: </span>
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

        <div className={styles.contentWrapper}>
          <div className={styles.buttonsWrapper}>
            <Button variant="secondary" disabled={isUploading}>
              <label htmlFor="cv-file-input">
                <input
                  type="file"
                  name="cvFileUpload"
                  accept=".pdf"
                  id="cv-file-input"
                  multiple={false}
                  className={styles.hidden}
                  onChange={handleFileChange}
                />
                {isUploading
                  ? t('importing')
                  : uploadedCVurl
                  ? t('uploadAnotherCVfile')
                  : t('uploadCVfile')}
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
