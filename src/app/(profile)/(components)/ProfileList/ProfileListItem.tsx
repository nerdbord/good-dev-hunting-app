'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { PlausibleEvents } from '@/lib/plausible'
import { usePlausible } from 'next-plausible'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import { UrlObject } from 'url'
import ProfileCard from '../ProfileCard/ProfileCard'

interface ProfileListItemProps {
  data: ProfileModel
  searchTerm?: string
  href: string | UrlObject
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  data,
  href,
}) => {
  const plausible = usePlausible()
  const searchParams = useSearchParams()

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
      href={href}
    />
  )
}
