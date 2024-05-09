'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { PlausibleEvents } from '@/lib/plausible'
import { useSession } from 'next-auth/react'
import { usePlausible } from 'next-plausible'
import { useSearchParams } from 'next/navigation'
import React from 'react'

import ProfileCard from '../ProfileCard/ProfileCard'

interface ProfileListItemProps {
  data: ProfileModel
  isHiddenName?: boolean
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  data,
  isHiddenName,
}) => {
  const plausible = usePlausible()
  const searchParams = useSearchParams()

  const { data: session } = useSession()

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })
  }

  return (
    <ProfileCard
      data={data}
      searchTerm={searchParams.get('search')}
      onClick={handleOpenProfile}
      isHiddenName={!(!isHiddenName || session?.user)}
    />
  )
}
