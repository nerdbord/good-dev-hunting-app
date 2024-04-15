'use client'
import { useProfiles } from '@/app/(profile)/(components)/ProfilesProvider'
import { updateOrCreateProfileViewAction } from '@/app/(profile)/_actions/updateOrCreateProfileViewAction'
import { type ProfileModel } from '@/app/(profile)/types'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import { usePlausible } from 'next-plausible'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ProfileCard from '../ProfileCard/ProfileCard'

interface ProfileListItemProps {
  data: ProfileModel
  searchTerm?: string
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({ data }) => {
  const router = useRouter()
  const plausible = usePlausible()
  const searchParams = useSearchParams()
  const { data: session } = useSession()
  const { refreshProfilesWithProfileViews } = useProfiles()
  const { runAsync } = useAsyncAction()

  const isVisited = data.profileViews?.some(
    (view) => view.viewerId === session?.user?.id,
  )

  const isContacted = data.contactRequests?.some(
    (contact) => contact.senderEmail === session?.user?.email,
  )

  const handleOpenProfile = (event: React.MouseEvent) => {
    event.preventDefault()

    if (!session) {
      return router.push(AppRoutes.signIn)
    }

    plausible(PlausibleEvents.OpenProfile, {
      props: { username: data.githubUsername },
    })

    runAsync(async () => {
      const profileView = await updateOrCreateProfileViewAction(
        session?.user.id,
        data.id,
      )

      if (profileView) {
        refreshProfilesWithProfileViews(session?.user.id, data.id, profileView)
      }

      router.push(`${AppRoutes.profile}/${data.githubUsername}`)
    })
  }

  return (
    <ProfileCard
      data={data}
      searchTerm={searchParams.get('search')}
      onClick={handleOpenProfile}
      isVisited={isVisited}
      isContacted={isContacted}
    />
  )
}
