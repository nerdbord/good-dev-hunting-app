'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { useSearchParams } from 'next/navigation'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { usePlausible } from 'next-plausible'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

interface ProfileListItemProps {
  data: ProfileModel
  searchTerm?: string
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({ data }) => {
  const searchParams = useSearchParams()

  return (
    <ProfileCard
      data={data}
      searchTerm={searchParams.get('search')}
      userIsModerator
    />
  )
}
