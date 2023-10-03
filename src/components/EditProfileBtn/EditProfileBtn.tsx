'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

const EditProfileBtn = () => {
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

export default EditProfileBtn
