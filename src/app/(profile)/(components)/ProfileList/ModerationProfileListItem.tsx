'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { useRouter } from 'next/navigation'
import React from 'react'

import { AppRoutes } from '@/utils/routes'
import ProfileCard from '../ProfileCard/ProfileCard'

export const ModerationProfileListItem: React.FC<{
  profile: ProfileModel
  userIsModerator: boolean | undefined
}> = ({ profile, userIsModerator }) => {
  const router = useRouter()

  const handleOpenProfile = () => {
    router.push(`${AppRoutes.moderationProfile}/${profile.userId}`)
  }

  return (
    <ProfileCard
      withStateStatus
      data={profile}
      userIsModerator={userIsModerator}
      onClick={handleOpenProfile}
    />
  )
}
