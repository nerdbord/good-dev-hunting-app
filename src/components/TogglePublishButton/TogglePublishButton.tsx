/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import styles from './TogglePublishButton.module.scss'
import { Button } from '@/components/Button/Button'
import React, { useState } from 'react'
import { apiClient } from '@/lib/apiClient'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PublishProfilePopup } from '../TogglePublishPopup/TogglePublishPopup'

interface TogglePublishButtonProps {
  profileId: string
  isPublished: boolean
}

export const TogglePublishButton = (props: TogglePublishButtonProps) => {
  const [showPopup, setShowPopup] = useState(false)
  const { profileId, isPublished } = props

  const { loading, runAsync } = useAsyncAction()

  return (
    <div>
      {showPopup && !loading && (
        <PublishProfilePopup
          isPublished={isPublished}
          onClose={() => setShowPopup(false)}
        />
      )}
      <Button
        variant={'primary'}
        loading={loading}
        onClick={() =>
          runAsync(async () => {
            await apiClient.publishMyProfile(profileId)
            setShowPopup(true)
          })
        }
      >
        {isPublished ? 'Unpublish profile' : 'Publish profile'}
      </Button>
    </div>
  )
}
