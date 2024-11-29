'use client'

import { uploadCVdocumentFile } from '@/app/(files)/_actions/uploadCVdocumentFile'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './CvUploaderForm.module.scss'

export function CVuploaderForm() {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<{
    name: string
    url: string
  } | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  // const [selectedFileName, setSelectedFileName] = useState<string | null>(null)

  async function handleUpload() {
    // event.preventDefault()
    if (!selectedFile) {
      // setError('Wybierz plik przed przesłaniem.')
      return
    }

    const formData = new FormData()
    formData.append('cvFileUpload', selectedFile)

    setIsUploading(true)
    setError(null)

    try {
      const result = await uploadCVdocumentFile(formData)
      if (result.success) {
        if (result.cvUrl) {
          setUploadedFile({
            name: result.cvFile,
            url: result.cvUrl,
          })
        } else {
          throw new Error('Nieprawidłowe dane zwrócone z serwera')
        }
      } else {
        setError(result.error || 'Nieznany błąd')
      }
    } catch (err) {
      setError('Nieznany błąd podczas uploadu')
    } finally {
      setIsUploading(false)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (!file) {
      setError('Nie wybrano pliku. Wybierz plik przed przesłaniem.')
      setSelectedFile(null)
      return
    }

    const allowedExtensions = ['pdf']
    const fileExtension = file?.name.split('.').pop()?.toLowerCase()
    if (!allowedExtensions.includes(fileExtension || '')) {
      setError('Nieprawidłowy format pliku. Dozwolone są tylko .pdf i .docx.')
      setSelectedFile(null)
      return
    }

    setError(null)
    setSelectedFile(file)
    // setSelectedFileName(file.name)
    handleUpload()
  }

  return (
    <div>
      <div className={styles.errorMessageWrapper}>
        {error && (
          <div className={styles.errorMessage}>
            <ErrorIcon />
            {error}
          </div>
        )}
        {uploadedFile && (
          <div>
            <p>
              <span>Wybrany plik: {uploadedFile.name}</span>
              <a
                href={uploadedFile.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadedFile.name}
              </a>
            </p>
          </div>
        )}
        {/* {selectedFileName && (
            <div>
              <p>Wybrany plik: {selectedFileName}</p>
            </div>
          )} */}

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
