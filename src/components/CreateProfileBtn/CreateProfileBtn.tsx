'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import AddIcon from '@/assets/icons/AddIcon'

const CreateProfileBtn = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push(AppRoutes.createProfile)}
      variant={'primary'}
    >
      Create profile
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
