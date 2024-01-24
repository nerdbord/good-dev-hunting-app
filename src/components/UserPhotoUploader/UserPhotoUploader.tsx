'use client'
import React, { useState } from 'react'
import styles from './UserPhotoUploader.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useSession } from 'next-auth/react'
import { useUploadContext } from '@/contexts/UploadContext'
import { ErrorIcon } from '@/assets/icons/ErrorIcon'
import GithubUserPhotoUploader from './GithubUserPhotoUploader'

export const UserPhotoUploader = () => {
  const { data: session } = useSession()
  const [userImage, setUserImage] = useState(session?.user.image)
  const { imageUploadError, setImageUploadError, setSelectedFile } =
    useUploadContext()
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUploadError(false)
    const file = event.target.files?.[0]

    if (file && file.type.match(/image-*/)) {
      if (file.size <= 4 * 1024 * 1024) {
        setSelectedFile(file)
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
          <Image
            className={styles.picture}
            src={userImage || ''}
            alt="User uploaded"
            width={100}
            height={100}
            object-fit="cover"
          />
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
                Change picture
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
