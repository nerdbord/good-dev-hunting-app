'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { useModeration } from '@/app/(profile)/_providers/Moderation.provider'
import { SearchResultsInfo } from '@/components/SearchResultsInfo/SearchResultsInfo'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState, Role } from '@prisma/client'
import { SearchResultsInfo } from '../../../../components/SearchResultsInfo/SearchResultsInfo'

import { ModerationProfileListItem } from './ModerationProfileListItem'

import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './ProfileList.module.scss'

export default function ModerationProfilesWithFilters() {
  const {
    publishingStateFilter,
    setPendingStateCounter,
    searchEmailValue,
    profiles,
  } = useModeration()

  const { data: session } = useSession()
  const userIsModerator = session?.user.roles.includes(Role.MODERATOR)

  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    if (searchEmailValue) {
      return profile.email.includes(searchEmailValue)
    }
    return profile.state === publishingStateFilter
  })

  const hasResults = filteredProfiles.length > 0

  useTabCounter(profiles, PublishingState.PENDING, setPendingStateCounter)

  return (
    <div className={styles.moderationProfiles}>
      {searchEmailValue &&
        (hasResults ? (
          <SearchResultsInfo
            resultsQty={filteredProfiles.length}
            text="Search results for"
            hasResults
          />
        ) : (
          <SearchResultsInfo text="No search results for" />
        ))}

      <div className={hasResults ? styles.profileListCont : styles.noProfiles}>
        {hasResults ? (
          filteredProfiles.map((profile) => (
            <Link
              key={profile.id}
              href={`${AppRoutes.moderationProfile}/${profile.userId}`}
            >
              <ModerationProfileListItem
                key={profile.id}
                profile={profile}
                userIsModerator={userIsModerator}
              />
            </Link>
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  )
}
