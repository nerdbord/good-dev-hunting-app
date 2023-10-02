'use client'
import { Button } from '@/components/Button/Button'
import React from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAsyncAction } from '@/hooks/useAsyncAction'

interface TogglePublishButtonProps {
  profileId: string
  isPublished: boolean
}

export const TogglePublishButton = (props: TogglePublishButtonProps) => {
  const { profileId, isPublished } = props

  const { loading, runAsync } = useAsyncAction()

  return (
    <Button
      variant={'primary'}
      loading={loading}
      onClick={() =>
        runAsync(async () => {
          await apiClient.togglePublishMyProfile(profileId)
        })
      }
    >
      {isPublished ? 'Unpublish profile' : 'Publish profile'}
    </Button>
  )
}
