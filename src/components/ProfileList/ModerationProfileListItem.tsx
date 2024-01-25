'use client'
import React from 'react'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

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
        router.push(`${AppRoutes.dashboardProfile}/${profile.userId}`)
      }
    />
  )
}
