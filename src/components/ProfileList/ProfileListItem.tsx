import React from 'react'
import { ProfileModel } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import ProfileCard from '../ProfileCard/ProfileCard'

export const ProfileListItem: React.FC<{ data: ProfileModel }> = ({ data }) => {
  const router = useRouter()

  return (
    <ProfileCard
      data={data}
      onClick={() => router.push(`${AppRoutes.profiles}/${data.userId}`)}
    />
  )
}
