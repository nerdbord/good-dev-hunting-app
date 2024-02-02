import { ProfileModel } from '@/data/frontend/profile/types'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

export const ProfileListItem: React.FC<{ data: ProfileModel }> = ({ data }) => {
  const router = useRouter()
  const plausible = usePlausible()

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })
    router.push(`${AppRoutes.profiles}/${data.userId}`)
  }

  return <ProfileCard data={data} onClick={handleOpenProfile} />
}
