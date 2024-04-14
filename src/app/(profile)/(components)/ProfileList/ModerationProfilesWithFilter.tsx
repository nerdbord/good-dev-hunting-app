'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { useModerationFilter } from '@/app/(profile)/_providers/ModerationFilter.provider'
import { SearchResultsInfo } from '@/components/SearchResultsInfo/SearchResultsInfo'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState } from '@prisma/client'
import { ModerationProfileListItem } from './ModerationProfileListItem'

import styles from './ProfileList.module.scss'

type Props = {
  profiles: ProfileModel[]
}

export default function ModerationProfilesWithFilters({
  profiles = [],
}: Props) {
  const { publishingStateFilter, setPendingStateCounter, searchEmailValue } =
    useModerationFilter()

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
            <ModerationProfileListItem key={profile.id} profile={profile} />
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  )
}
