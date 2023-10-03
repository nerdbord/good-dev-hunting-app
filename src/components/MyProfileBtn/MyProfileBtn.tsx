'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

const MyProfileBtn = () => {
  const router = useRouter()
  return (
    <Button
      onClick={() => router.push(AppRoutes.myProfile)}
      variant={'primary'}
    >
      My profile
    </Button>
  )
}

export default MyProfileBtn
