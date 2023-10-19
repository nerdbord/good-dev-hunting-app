'use client'
import React, { useState } from 'react'
import styles from './UserPhotoUploader.module.scss'
import { Button } from '../Button/Button'
import { useSession } from 'next-auth/react'
import { apiClient } from '@/lib/apiClient'

export const UserPhotoUploader = () => {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userImage, setUserImage] = useState(session?.user.image)

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

  const importFromGithub = async () => {
    await apiClient.updateUserAvatar(session?.user.image || '')
  }

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const url = await apiClient.userPhotoUpload(selectedFile);
        setUserImage(url);
        await apiClient.updateUserAvatar(url);
      } catch (error) {
        console.log('error', error);
      }
    }
  };

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
        Upload a file
      </Button>
      {userImage && (
        <img className={styles.picture} src={userImage} alt="Uploaded" />
      )}
    </div>
  )
}

export default UserPhotoUploader;
