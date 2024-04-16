'use client'
import { type ProfileModel } from '@/app/(profile)/types'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState, Role } from '@prisma/client'
import { SearchResultsInfo } from '../../../../components/SearchResultsInfo/SearchResultsInfo'
import { ModerationProfileListItem } from './ModerationProfileListItem'

import { AppRoutes } from '@/utils/routes'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import styles from './ProfileList.module.scss'

type Props = {
  profiles: ProfileModel[]
}

export default function ModerationProfilesWithFilters({
  profiles = [],
}: Props) {
  const { publishingStateFilter, setPendingStateCounter, searchEmailValue } =
    useModerationFilter()

  const { data: session } = useSession()
  const userIsModerator = session?.user.roles.includes(Role.MODERATOR)

  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    if (searchEmailValue) {
      return profile.userEmail.includes(searchEmailValue)
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
