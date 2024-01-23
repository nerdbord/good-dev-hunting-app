'use client'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState } from '@prisma/client'
import { SearchResultsInfo } from '../SearchResultsInfo/SearchResultsInfo'
import { ModerationProfileListItem } from './ModerationProfileListItem'

import styles from './ProfileList.module.scss'

type Props = {
  profiles: ProfileModelSimplified[]
}

export default function ModerationProfilesWithFilters({
  profiles = [],
}: Props) {
  const { publishingStateFilter, setPendingStateCounter, searchEmailValue } =
    useModerationFilter()

  const filteredProfiles = profiles.filter(
    (profile: ProfileModelSimplified) => {
      if (searchEmailValue) {
        return profile.userEmail.includes(searchEmailValue)
      }
      return profile.state === publishingStateFilter
    },
  )

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
            <ModerationProfileListItem key={profile.id} profile={profile} />
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  )
}
