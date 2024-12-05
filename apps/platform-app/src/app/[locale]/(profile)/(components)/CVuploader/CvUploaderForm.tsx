'use client'

import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { ErrorIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import styles from './CvUploaderForm.module.scss'
import { fetchCVurl } from '../../_actions/mutations/fetchCVurl'

export function CVuploaderForm() {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadCvButtonText, setUploadCvButtonText] = useState<string>(
    t('uploadCVfile'),
  )

  const [uploadedCVurl, setUploadedCVurl] = useState<{
    name: string
    url: string
  } | null>(null)

  const { cvUploadError, onSetCvUploadError, onSetCvFormData } =
    useUploadContext()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  useEffect(() => {
    const loadCVurl = async () => {
      // if (!profileId) {
      //   console.warn('profileId is not defined');
      //   return;
      // }
      try {
        const url = await fetchCVurl(profileId);
        if (url) {
          setUploadedCVurl({ name: 'Your CV', url });
        }
      } catch (error) {
        console.error('Failed to fetch CV URL:', error);
      }
    };
  
    loadCVurl();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSetCvUploadError('')
    const file = event.target.files?.[0]

    // const result = await uploadCVdocumentFile(formData)
    // if (result.success) {
    //   if (result.cvUrl) {
    //     setUploadedFile({
    //       name: result.cvFile,
    //       url: result.cvUrl,
    //     })

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
      setIsUploading(true)
      setSelectedFile(file)
      onSetCvFormData(formData)
      setUploadCvButtonText(t('uploadAnotherCVfile'))
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

        {selectedFile && (
          <div className={styles.choosenFile}>
            <p>
              <span>Wybrany plik: </span>
              <a
                className="font-medium text-gray-900 underline"
                // href={blob.url}
                href={URL.createObjectURL(selectedFile)} // Generowanie URL dla pliku
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* {blob.url} */}
                {selectedFile.name}
              </a>
            </p>
          </div>
        )}

        {uploadedCVurl && (
          <div className={styles.choosenFile}>
            <p>
              <span>Wybrany plik: </span>
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
                {isUploading ? t('importing') : uploadCvButtonText}
              </label>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
