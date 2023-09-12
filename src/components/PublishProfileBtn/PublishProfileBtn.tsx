'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'

const PublishProfileBtn = () => {
  const { data: session } = useSession()
  const id = session?.user.id
  const profile = session?.user.profile

  const handlePublishClick = async () => {
    if (!id) {
      throw new Error(
        'Missing profile ID, please check if the authorization was successful.',
      )
    }

    if (id && profile) {
      try {
        await apiClient.publishMyProfile(id)
        console.log('Profile published successfully')
      } catch (error) {
        console.error('Failed to publish profile', error)
      }
    }
  }

  return (
    <Button variant={'primary'} onClick={handlePublishClick}>
      {' '}
      Publish profile{' '}
    </Button>
  )
}

export default PublishProfileBtn
