'use client'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import React from 'react'

import ProfileCard from '../ProfileCard/ProfileCard'

export const ModerationProfileListItem: React.FC<{ profile: ProfileModel }> = ({
  profile,
}) => {
  const router = useRouter()

  return (
    <ProfileCard
      withStateStatus
      data={profile}
      onClick={() =>
        router.push(`${AppRoutes.moderationProfile}/${profile.userId}`)
      }
    />
  )
}
