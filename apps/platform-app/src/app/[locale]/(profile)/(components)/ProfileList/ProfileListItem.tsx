'use client'
import { createOrUpdateProfileView } from '@/app/[locale]/(profile)/_actions'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { useProfiles } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
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
  const { runAsync } = useAsyncAction()
  const { markProfileAsVisited } = useProfiles()

  const visitedProfile = data.profileViews?.find(
    (view) => view.viewerId === session?.user?.id,
  )

  const contactedProfile = data.contactRequests?.find(
    (contact) => contact.senderId === session?.user?.id,
  )

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })

    if (session && session.user) {
      runAsync(async () => {
        const profileView = await createOrUpdateProfileView(
          session.user.id,
          data.id,
        )

        if (profileView) {
          markProfileAsVisited(profileView)
        }
      })
    }
  }

  return (
    <ProfileCard
      data={data}
      searchTerm={searchParams.get('search')}
      onClick={handleOpenProfile}
      isHiddenName={!(!isHiddenName || session?.user)}
      visitedDate={visitedProfile?.createdAt}
      contactedDate={contactedProfile?.createdAt}
      href={`${AppRoutes.profile}/${data.githubUsername}`}
    />
  )
}
