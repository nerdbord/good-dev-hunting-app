'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import AddIcon from '@/assets/icons/AddIcon'
import React from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface MyProfileButtonProps {
  profileId: string | null
}

export const MyProfileButton = (props: MyProfileButtonProps) => {
  const { profileId } = props
  const router = useRouter()
  const path = usePathname()

  if (path.includes(AppRoutes.myProfile)) {
    return null
  }

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
