'use client'
import React from 'react'
import { Button } from '../Button/Button'
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
  const { publishingStateFilter, setPendingStateCounter, searchEmailValue } =
    useModerationFilter()

  const filteredData = data.filter((user: ProfileModel) => {
    return user?.state === publishingStateFilter
  })

  setPendingStateCounter &&
    useTabCounter(data, PublishingState.PENDING, setPendingStateCounter)

  if (searchEmailValue !== '') {
    return (
      <div className={styles.moderationProfiles}>
        <div className={styles.searchInfoCont}>
          <p className={styles.searchInfo}>
            Search results for{' '}
            <span className={styles.searchValue}>"{searchEmailValue}" (0)</span>
          </p>
          <Button variant="action">Clear search</Button>
        </div>
        <div className={styles.searchEmptyInfoCont}>
          <p className={styles.searchInfo}>
            No search results for{' '}
            <span className={styles.searchValue}>"{searchEmailValue}" (0)</span>
          </p>
          <Button variant="primary">Clear search</Button>
        </div>
        <div className={styles.profileListCont}>
          {filteredData.map((profile) => {
            if (profile) {
              return (
                <ModerationProfileListItem key={profile.id} data={profile} />
              )
            }
          })}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.moderationProfiles}>
      <div className={styles.profileListCont}>
        {filteredData.map((profile) => {
          if (profile) {
            return <ModerationProfileListItem key={profile.id} data={profile} />
          }
        })}
      </div>
    </div>
  )
}
