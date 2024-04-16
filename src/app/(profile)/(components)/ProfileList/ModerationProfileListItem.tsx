'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { useRouter } from 'next/navigation'
import React from 'react'

import ProfileCard from '../ProfileCard/ProfileCard'

export const ModerationProfileListItem: React.FC<{
  profile: ProfileModel
  userIsModerator: boolean | undefined
}> = ({ profile, userIsModerator }) => {
  const router = useRouter()

  return (
    <ProfileCard
      withStateStatus
      data={profile}
      userIsModerator={userIsModerator}
    />
  )
}
