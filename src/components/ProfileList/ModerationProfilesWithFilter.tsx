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
  data: ProfileModel[]
}

export default function ModerationProfilesWithFilters({ data = [] }: Props) {
  const {
    publishingStateFilter,
    setPendingStateCounter,
    searchEmailValue,
    setEmailSearchValue,
    setActiveTab,
  } = useModerationFilter()

  const filteredData = data.filter((user: ProfileModel) => {
    if (searchEmailValue !== '') {
      return user.userEmail.includes(searchEmailValue)
    }
    return user?.state === publishingStateFilter
  })

  setPendingStateCounter &&
    useTabCounter(data, PublishingState.PENDING, setPendingStateCounter)

  const clearHandler = () => {
    setEmailSearchValue && setEmailSearchValue('')
    setActiveTab && setActiveTab(PublishingState.PENDING)
  }

  return (
    <div className={styles.moderationProfiles}>
      <SearchResultsInfo
        searchEmailValue={searchEmailValue}
        filteredData={filteredData}
        clearHandler={clearHandler}
      />

      <div className={styles.profileListCont}>
        {filteredData.map(
          (profile) =>
            profile && (
              <ModerationProfileListItem key={profile.id} data={profile} />
            ),
        )}
      </div>
    </div>
  )
}

