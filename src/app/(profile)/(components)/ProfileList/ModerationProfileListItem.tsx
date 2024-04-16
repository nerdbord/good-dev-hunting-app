'use client'
import { type ProfileModel } from '@/app/(profile)/types'
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
