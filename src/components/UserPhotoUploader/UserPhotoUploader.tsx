'use client'
import React, { useEffect, useState } from 'react'
import styles from './UserPhotoUploader.module.scss'
import { Button } from '../Button/Button'
import { useSession } from 'next-auth/react'
import { apiClient } from '@/lib/apiClient'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useUploadContext } from '@/contexts/UploadContext'

interface UserPhotoUploaderProps {
  profile: ProfileModel
}

export const UserPhotoUploader = ({ profile }: UserPhotoUploaderProps) => {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userImage, setUserImage] = useState(
    profile.avatarUrl || session?.user.image,
  )
  const { triggerUpload, setTriggerUpload } = useUploadContext()

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
      `http://github.com/${profile.githubUsername}.png`,
    )
    fetchUserAvatar()
  }

  const handleUpload = async () => {
    if (selectedFile) {
      try {
        const url = await apiClient.userPhotoUpload(selectedFile)
        setUserImage(url)
        await apiClient.updateUserAvatar(url)
        fetchUserAvatar()
      } catch (error) {
        console.log('error', error)
      }
    }
  }

  return (
    <div>
      <div className={styles.wrapper}>
        <p className={styles.containerLabel}>Picture</p>
        <img
          className={styles.picture}
          src={userImage || profile.avatarUrl || session?.user.image}
          alt="User uploaded"
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
  )
}

export default UserPhotoUploader
