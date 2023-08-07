'use client'
import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/inputs/Button/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { apiClient } from '@/lib/apiClient'

const ProfileTopBar = () => {
  const { data: session } = useSession()
  console.log(session);

  const router = useRouter()

  const handlePublishClick = async () => {
    try {
      await apiClient.publishProfile(session)
      console.log('Profile published successfully')
    } catch (error) {
      console.error('Failed to publish profile', error)
    }
  }

  const handleEditClick = () => {
    router.push(AppRoutes.createProfile)
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
