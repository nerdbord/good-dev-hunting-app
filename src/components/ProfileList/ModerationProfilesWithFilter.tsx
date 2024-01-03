'use client'
import React from 'react'
import { SearchResultsInfo } from '../SearchResultsInfo/SearchResultsInfo'
import { ModerationProfileListItem } from './ModerationProfileListItem'
import { ProfileModel } from '@/data/frontend/profile/types'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState } from '@prisma/client'

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
            <ModerationProfileListItem key={profile.id} profile={profile} />
          ))
        ) : (
          <p>No profiles found</p>
        )}
      </div>
    </div>
  )
}
