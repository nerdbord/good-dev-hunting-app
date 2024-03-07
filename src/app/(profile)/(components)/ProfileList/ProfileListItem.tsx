'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

interface ProfileListItemProps {
  data: ProfileModel
  searchTerm?: string
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  data,
  searchTerm,
}) => {
  const router = useRouter()
  const plausible = usePlausible()

  const handleOpenProfile = (event: React.MouseEvent) => {
    event.preventDefault()
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })
    router.push(`${AppRoutes.profiles}/${data.githubUsername}`)
  }
  return (
    <div onClick={handleOpenProfile}>
      <ProfileCard data={data} searchTerm={searchTerm} />
    </div>
  )
}
