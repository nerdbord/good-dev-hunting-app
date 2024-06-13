'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import { usePlausible } from 'next-plausible'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import styles from './ProfileList.module.scss'

import ProfileCard from '../ProfileCard/ProfileCard'
import Link from 'next/link'

interface ProfileListItemProps {
  profile: ProfileModel
}

export const ProfileListItem: React.FC<ProfileListItemProps> = ({
  profile,
}) => {
  const plausible = usePlausible()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  const isHiddenName = !session?.user

  const visitedProfile = profile.profileViews?.find(
    (view) => view.viewerId === session?.user?.id,
  )

  const contactedProfile = profile.contactRequests?.find(
    (contact) => contact.senderId === session?.user?.id,
  )

  const handleOpenProfile = () => {
    plausible(PlausibleEvents.OpenProfile, {
      props: { username: profile.githubUsername },
    })
  }

  return (
    <Link
      href={`${AppRoutes.profile}/${profile.githubUsername}`}
      onClick={handleOpenProfile}
      className={`${styles.frameWrapper}`}
    >
      <ProfileCard
        profile={profile}
        searchTerm={searchParams.get('search')}
        isHiddenName={isHiddenName}
        visitedDate={visitedProfile?.createdAt}
        contactedDate={contactedProfile?.createdAt}
      />
    </Link>
  )
}
