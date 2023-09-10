'use client'
import React, { useState, useEffect } from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { apiClient } from '@/lib/apiClient'

interface ProfileTopBarProps {
  profileId: string
}
const ProfileTopBar = ({ profileId }: ProfileTopBarProps) => {
  const [isPublished, setIsPublished] = useState<boolean>(false)

  const router = useRouter()

  // useEffect(() => {
  //   const fetchProfileData = async () => {
  //     try {
  //       const userProfileData = await apiClient.getUserProfile()

  //       if (userProfileData) {
  //         setIsPublished(userProfileData.isPublished)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user profile:', error)
  //     }
  //   }

  //   fetchProfileData()
  // }, [])

  // const handleTogglePublish = async () => {
  //   if (!profileId) {
  //     throw new Error(
  //       'Missing profile ID, please check if the authorization was successful.',
  //     )
  //   }

  //   try {
  //     const toggledProfile = await apiClient.togglePublishMyProfile(profileId)

  //     if (!toggledProfile) {
  //       throw new Error('Failed to retrieve the updated profile data.')
  //     }

  //     setIsPublished(toggledProfile.isPublished)

  //     console.log('Profile publication toggled successfully')
  //   } catch (error) {
  //     console.error('Failed to toggle profile publication', error)
  //   }
  // }

  const handleTogglePublish = async () => {
    if (!profileId) {
      throw new Error(
        'Missing profile ID, please check if the authorization was successful.',
      )
    }

    try {
      await apiClient.togglePublishMyProfile(profileId)

      setIsPublished(true)

      console.log('Profile publication set to true')
    } catch (error) {
      console.error('Failed to set profile publication to true', error)
    }
  }

  const handleEditClick = () => {
    router.push(AppRoutes.editProfile)
  }

  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        <Button variant={'secondary'} onClick={handleEditClick}>
          {' '}
          Edit{' '}
        </Button>
        <Button variant={'primary'} onClick={handleTogglePublish}>
          {isPublished ? 'Unpublish profile' : 'Publish profile'}
        </Button>
      </div>
    </div>
  )
}

export default ProfileTopBar
