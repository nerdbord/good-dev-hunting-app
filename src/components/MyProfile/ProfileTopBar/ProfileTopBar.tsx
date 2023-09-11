'use client'
import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/components/Button/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { apiClient } from '@/lib/apiClient'

const ProfileTopBar = () => {
  const router = useRouter()

  const { data: session } = useSession()
  const profile = session?.user?.profile

  const handlePublishClick = async () => {
    if (!profile) {
      throw new Error(
        'Missing profile ID, please check if the authorization was successful.',
      )
    }

    try {
      await apiClient.publishMyProfile(profile)
      console.log('Profile published successfully')
    } catch (error) {
      console.error('Failed to publish profile', error)
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
        <Button variant={'primary'} onClick={handlePublishClick}>
          {' '}
          Publish profile{' '}
        </Button>
      </div>
    </div>
  )
}

export default ProfileTopBar
