'use client'

import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './CvUploaderForm.module.scss'

export function CVuploaderForm() {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [isUploading, setIsUploading] = useState(false)

  const { cvUploadError, setCvUploadError, setCvFormData } = useUploadContext()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCvUploadError(false)
    const file = event.target.files?.[0]

    if (
      file &&
      file?.type === 'application/pdf' &&
      file.size <= 5 * 1024 * 1024
    ) {
      const formData = new FormData()
      formData.append('cvFileUpload', file)
      setIsUploading(true)
      setSelectedFile(file)
      setCvFormData(formData)
    } else {
      setCvUploadError(true)
      setErrorMsg(
        file?.size > 5 * 1024 * 1024
          ? 'Choose a file smaller than 5MB'
          : 'Only PDF files are supported',
      )
    }
    setIsUploading(false)
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

        {selectedFile && (
          <div className={styles.choosenFile}>
            <p>
              <span>Wybrany plik: </span>
              {selectedFile.name}
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
                {isUploading ? t('importing') : t('uploadCVfile')}
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
