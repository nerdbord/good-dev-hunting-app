'use client'
import React from 'react'
import styles from './ProfileList.module.scss'
import { ProfileModel } from '@/data/frontend/profile/types'
import { ModerationProfileListItem } from './ModerationProfileListItem'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'
import useTabCounter from '@/hooks/useTabCounter'
import { PublishingState } from '@prisma/client'

type Props = {
  data: ProfileModel[]
}

export default function ({ data = [] }: Props) {
  const { publishingStateFilter, setPendingStateCounter } =
    useModerationFilter()

  const filteredData = data.filter((profile: ProfileModel) => {
    return profile.state === publishingStateFilter
  })

  setPendingStateCounter &&
    useTabCounter(data, PublishingState.PENDING, setPendingStateCounter)

  return (
    <div className={styles.profileListCont}>
      {filteredData.map((profile) => (
        <ModerationProfileListItem key={profile.id} data={profile} />
      ))}
    </div>
  )
}
