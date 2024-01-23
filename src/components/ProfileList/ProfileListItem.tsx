import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

export const ProfileListItem: React.FC<{ data: ProfileModelSimplified }> = ({
  data,
}) => {
  const router = useRouter()

  return (
    <ProfileCard
      data={data}
      onClick={() => router.push(`${AppRoutes.profiles}/${data.userId}`)}
    />
  )
}
