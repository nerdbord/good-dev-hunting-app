'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { useSearchParams } from 'next/navigation'
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
