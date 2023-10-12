'use client'

import { Button } from '@/components/Button/Button'
import React from 'react'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

export const EditProfileButton = () => {
  const router = useRouter()

  const handleEditClick = () => {
    router.push(AppRoutes.editProfile)
  }

  return (
    <Button variant={'secondary'} onClick={handleEditClick}>
      {' '}
      Edit{' '}
    </Button>
  )
}
