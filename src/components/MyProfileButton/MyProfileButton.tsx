'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import AddIcon from '@/assets/icons/AddIcon'
import React from 'react'
import { useRouter } from 'next/navigation'

interface MyProfileButtonProps {
  profileId: string | null
}

export const MyProfileButton = (props: MyProfileButtonProps) => {
  const { profileId } = props
  const router = useRouter()
  return profileId === null ? (
    <Button
      onClick={() => router.push(AppRoutes.createProfile)}
      variant={'primary'}
    >
      Create profile
      <AddIcon />
    </Button>
  ) : (
    <Button
      onClick={() => router.push(AppRoutes.myProfile)}
      variant={'primary'}
    >
      My profile
    </Button>
  )
}
