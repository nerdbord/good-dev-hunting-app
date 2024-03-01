'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import React from 'react'

import ProfileCard from '../ProfileCard/ProfileCard'

export const SearchByNameProfileListItem: React.FC<{
  profile: ProfileModel
}> = ({ profile }) => {
  const router = useRouter()
  const plausible = usePlausible()

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: profile.githubUsername },
    })
    router.push(`${AppRoutes.profiles}/${profile.githubUsername}`)
  }

  return <ProfileCard data={profile} onClick={handleOpenProfile} />
}
