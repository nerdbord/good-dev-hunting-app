'use client'
import React from 'react'
import styles from './ProfileList.module.scss'
import { ProfileModel } from '@/data/frontend/profile/types'
import { ModerationProfileListItem } from './ModerationProfileListItem'
import { useModerationFilter } from '@/contexts/ModerationFilterContext'

type Props = {
  data: ProfileModel[]
}

export default function ({ data = [] }: Props) {
  const { publishingStateFilter } = useModerationFilter()

  const filteredData = data.filter((profile: ProfileModel) => {
    return profile.state === publishingStateFilter
  })

  return (
    <div className={styles.profileListCont}>
      {filteredData.map((profile) => (
        <ModerationProfileListItem key={profile.id} data={profile} />
      ))}
    </div>
  )
}
