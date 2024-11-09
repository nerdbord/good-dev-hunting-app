'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { PlausibleEvents } from '@/lib/plausible'
import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import { usePlausible } from 'next-plausible'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import styles from './ProfileList.module.scss'

import Link from 'next/link'
import ProfileCard from '../ProfileCard/ProfileCard'

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
      props: { username: profile.githubUsername ?? profile.linkedinUsername }, // not sure about that CC: Sumick
    })
  }

  return (
    <Link
      href={`${AppRoutes.profile}/${
        profile.githubUsername ?? profile.linkedinUsername
      }`}
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
