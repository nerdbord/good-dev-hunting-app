'use client'
import { StateStatus } from '@/app/[locale]/(moderation)/(components)/StateStatus/StateStatus'
import { useModerationProfilesStore } from '@/app/[locale]/(moderation)/_providers/moderation-profiles-store.provider'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { SearchResultsInfo } from '@/components/SearchResultsInfo/SearchResultsInfo'
import useTabCounter from '@/hooks/useTabCounter'
import { AppRoutes } from '@/utils/routes'
import { PublishingState } from '@prisma/client'
import Link from 'next/link'
import ProfileCard from '../ProfileCard/ProfileCard'
import styles from './ProfileList.module.scss'
import { useSession } from 'next-auth/react'
import Loader from '@/components/Loader/Loader'

export default function ModerationProfilesWithFilters() {
  const { status } = useSession()
  const {
    publishingState,
    setPendingStateCounter,
    searchValue,
    moderationProfiles,
  } = useModerationProfilesStore((state) => state)

  const filteredProfiles = moderationProfiles.filter(
    (profile: ProfileModel) => {
      if (searchValue) {
        return profile.email.includes(searchValue)
      }
      return profile.state === publishingState
    },
  )

  const hasResults = filteredProfiles.length > 0

  useTabCounter(
    moderationProfiles,
    PublishingState.PENDING,
    setPendingStateCounter,
  )

  if (status === 'loading') {
    return <Loader />
  }

  if (!hasResults) {
    return (
      <div className={styles.noProfiles}>
        <p>No profiles found</p>
      </div>
    )
  }

  return (
    <div className={styles.moderationProfiles}>
      {searchValue &&
        (hasResults ? (
          <SearchResultsInfo
            resultsQty={filteredProfiles.length}
            text="Search results for"
            hasResults
          />
        ) : (
          <SearchResultsInfo text="No search results for" />
        ))}

      <div className={styles.profileListCont}>
        {filteredProfiles.map((profile) => (
          <div className={styles.frameWrapper} key={profile.id}>
            <Link href={`${AppRoutes.moderationProfile}/${profile.userId}`}>
              <ProfileCard key={profile.id} profile={profile} />
            </Link>
            <div className={styles.detailsWrapper}>
              <StateStatus
                profileId={profile.id}
                profileState={profile.state}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
