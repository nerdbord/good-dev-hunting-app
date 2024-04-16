'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import React from 'react'

import ProfileCard from '../ProfileCard/ProfileCard'

export const ModerationProfileListItem: React.FC<{
  profile: ProfileModel
  userIsModerator: boolean | undefined
}> = ({ profile, userIsModerator }) => {
  return (
    <ProfileCard
      withStateStatus
      data={profile}
      userIsModerator={userIsModerator}
    />
  )
}
