'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { apiClient } from '@/lib/apiClient'
import { useSession } from 'next-auth/react'

const PublishProfileBtn = () => {
  const session = useSession()
  const id = session?.data?.user?.id

  if (!id) {
    console.log('there is something wrong with id => ', id)
    return null
  }

  const handlePublishClick = async () => {
    if (id) {
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
      Publish profile button{' '}
    </Button>
  )
}

export default PublishProfileBtn
