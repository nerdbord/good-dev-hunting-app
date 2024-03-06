'use client'
import { ProfileModel } from '@/app/(profile)/types'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { usePlausible } from 'next-plausible'
import { useRouter } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

import { signIn, useSession } from 'next-auth/react'

export const ProfileListItem: React.FC<{ data: ProfileModel }> = ({ data }) => {
  const router = useRouter()
  const plausible = usePlausible()

  const { data: session, status } = useSession()

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })
    if (status == 'unauthenticated') {
      signIn('github', {
        callbackUrl: `${AppRoutes.profiles}/${data.githubUsername}`,
      })
    } else if (status == 'authenticated') {
      router.push(`${AppRoutes.profiles}/${data.githubUsername}`)
    }
  }

  return <ProfileCard data={data} onClick={handleOpenProfile} />
}
