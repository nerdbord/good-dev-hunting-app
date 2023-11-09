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
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { fetchUserAvatar } from '@/actions/user/fetchUserAvatar'
import { importAvatarFromGithub } from '@/actions/user/importAvatarFromGithub'
import { serverUpdateUserAvatar } from '@/actions/user/updateUserAvatar'

interface UserPhotoUploaderProps {
  profile: ProfileModel | null
}

export const UserPhotoUploader = ({ profile }: UserPhotoUploaderProps) => {
  const { data: session } = useSession()
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [userImage, setUserImage] = useState(
    profile?.avatarUrl || session?.user.image,
  )
  const {
    triggerUpload,
    setTriggerUpload,
    setUploadSuccess,
    setFileSelected,
    setIsUploading,
  } = useUploadContext()
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { runAsync, loading } = useAsyncAction()

  useEffect(() => {
    if (triggerUpload) {
      handleUpload()
      setTriggerUpload(false)
    }
  }, [triggerUpload])

  const initializeAvatar = async () => {
    try {
      const avatarUrl = await fetchUserAvatar()
      setUserImage(avatarUrl || session?.user.image)
    } catch (error) {
      console.error('Failed to fetch user avatar:', error)
    }
  }

  useEffect(() => {
    initializeAvatar()
  }, [])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFileSelected(true)
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setUserImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setFileSelected(false)
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const importFromGithub = async () => {
    await runAsync(async () => {
      const avatarUrl = await importAvatarFromGithub()
      if (!avatarUrl) {
        setShowErrorMessage(true)
        return
      }
      setUserImage(avatarUrl)
    }).catch(() => {
      setShowErrorMessage(true)
    })
  }

  const uploadFile = async (file: File) => {
    const url = await apiClient.userPhotoUpload(file)
    await serverUpdateUserAvatar(url)
    await fetchUserAvatar()
    return url
  }
  const handleUpload = async () => {
    if (selectedFile) {
      setIsUploading(true)
      setShowErrorMessage(false)
      try {
        const url = await uploadFile(selectedFile)
        setUserImage(url)
        setUploadSuccess(true)
      } catch (error) {
        console.error('Error during file upload:', error)
        setShowErrorMessage(true)
        setUploadSuccess(false)
      } finally {
        setIsUploading(false)
      }
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>Picture</p>
      <div className={styles.errorMessageWrapper}>
        {showErrorMessage && (
          <div className={styles.errorMessage}>
            <ErrorIcon />
            Picture failed to upload. Try again
          </div>
        )}
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
            <Button
              variant="secondary"
              onClick={importFromGithub}
              disabled={loading}
            >
              {loading ? 'Importing...' : 'Import from Github'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
