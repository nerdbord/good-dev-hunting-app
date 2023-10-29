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
  const {
    publishingStateFilter,
    setPendingStateCounter,
    searchEmailValue,
    setEmailSearchValue,
    setActiveTab,
  } = useModerationFilter()

  const filteredProfiles = profiles.filter((profile: ProfileModel) => {
    if (searchEmailValue !== '') {
      return profile.userEmail.includes(searchEmailValue)
    }
    return profile.state === publishingStateFilter
  })

  useTabCounter(profiles, PublishingState.PENDING, setPendingStateCounter)

  const clearHandler = () => {
    setEmailSearchValue('')
    setActiveTab(PublishingState.PENDING)
  }

  return (
    <div className={styles.moderationProfiles}>
      <SearchResultsInfo
        searchEmailValue={searchEmailValue}
        profiles={filteredProfiles}
        clearHandler={clearHandler}
      />

      <div className={styles.profileListCont}>
        {filteredProfiles.map((profile) => (
          <ModerationProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}

