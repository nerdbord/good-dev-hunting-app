'use client'
import React, { useEffect, useState } from 'react'
import styles from './UserPhotoUploader.module.scss'
import Image from 'next/image'
import { Button } from '../Button/Button'
import { useSession } from 'next-auth/react'
import { apiClient } from '@/lib/apiClient'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useUploadContext } from '@/contexts/UploadContext'
import { ErrorIcon } from '@/assets/icons/ErrorIcon'

interface UserPhotoUploaderProps {
  profile: ProfileModel | null
}

export const UserPhotoUploader = ({ profile }: UserPhotoUploaderProps) => {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userImage, setUserImage] = useState(
    profile?.avatarUrl || session?.user.image,
  )
  const { triggerUpload, setTriggerUpload } = useUploadContext()
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)

  useEffect(() => {
    if (triggerUpload) {
      handleUpload()
      setTriggerUpload(false)
    }
  }, [triggerUpload])

  const fetchUserAvatar = async () => {
    try {
      const avatarUrl = await apiClient.getUserAvatar()
      setUserImage(avatarUrl)
    } catch (error) {
      console.error('Failed to fetch user avatar:', error)
    }
  }

  useEffect(() => {
    fetchUserAvatar()
  }, [])

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
    await apiClient.updateUserAvatar(
      `http://github.com/${profile?.githubUsername}.png`,
    )
    setUserImage(`http://github.com/${profile?.githubUsername}.png`)
  }

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const url = await apiClient.userPhotoUpload(selectedFile)
        setUserImage(url)
        await apiClient.updateUserAvatar(url)
        fetchUserAvatar()
        setShowErrorMessage(false)
      } catch (error) {
        console.log('error', error)
        setShowErrorMessage(true)
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>Picture</p>
      <div className={styles.errorMessageWrapper}>
        <div className={showErrorMessage ? styles.errorMessage : styles.hidden}>
          <ErrorIcon />
          Picture failed to upload. Try again
        </div>
        <div className={styles.contentWrapper}>
          <Image
            className={styles.picture}
            src={userImage || profile?.avatarUrl || session?.user.image || ''}
            alt="User uploaded"
            width={100}
            height={100}
          />
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
      </div>
    </div>
  )
}

export default UserPhotoUploader
