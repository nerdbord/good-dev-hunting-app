'use client'
import React, { useState } from 'react'
import styles from './UserPhotoUploader.module.scss'
import { Button } from '../Button/Button'
import { PutBlobResult } from '@vercel/blob'
import { useSession } from 'next-auth/react'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'

export const UserPhotoUploader = () => {
  const { setFieldValue, values } = useFormikContext<CreateProfileFormValues>()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userImage, setUserImage] = useState<string>(values.avatarUrl)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const { data: session } = useSession()
  const importFromGithub = async () => {
    setUserImage(session?.user?.image || '')
  }

  const updateUserAvatar = async (avatarUrl: string) => {
    try {
      const response = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatarUrl }),
      })

      if (!response.ok) {
        throw new Error('Failed to update avatar')
      }

      const data = await response.json()
      console.log('Updated user:', data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpload = async () => {
    if (selectedFile) {
      fetch('/api/user/photo', {
        method: 'POST',
        headers: {
          'content-type': selectedFile.type || 'application/octet-stream',
        },
        body: selectedFile,
      }).then(async (res) => {
        if (res.status === 200) {
          const { url } = (await res.json()) as PutBlobResult
          setUserImage(url)
          setFieldValue('avatarUrl', url)

          // tutej
          await updateUserAvatar(url)
        } else {
          console.error('Error uploading the file.')
        }
      })
    }
  }
  return (
    <div>
      <div className={styles.wrapper}>
        <p className={styles.containerLabel}>Picture</p>
        <img className={styles.picture} src={userImage} alt="User uploaded" />
        <p>po uploadzie url się zmienia na ten z vercela{userImage}</p>
        <div className={styles.buttonsWrapper}>
          <Button variant="secondary">
            <label htmlFor="file-input">
              <input
                id="file-input"
                type="file"
                className={styles.hidden}
                onChange={handleFileChange}
                multiple={false}
              />
              Change picture
            </label>
          </Button>
          <Button variant="secondary" onClick={importFromGithub}>
            Import from Github
          </Button>
        </div>
      </div>
      <Button variant="primary" onClick={handleUpload}>
        Upload a file, to jest kod testowy
      </Button>
      {userImage && (
        <img className={styles.picture} src={userImage} alt="Uploaded" />
      )}
    </div>
  )
}

export default UserPhotoUploader
