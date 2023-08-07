'use client'
import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/inputs/Button/Button'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AppRoutes } from '@/utils/routes'

const ProfileTopBar = () => {
  const { data: session } = useSession()
  const userId = session?.user?.id

  const router = useRouter()

  const handlePublishClick = async () => {
    if (!userId) {
      console.error('No user ID found')
      return
    }

    const response = await fetch(
      `http://localhost:3000/api/profiles/${userId}/publish`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    if (response.ok) {
      console.log('Profile published successfully')
    } else {
      console.error('Failed to publish profile')
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