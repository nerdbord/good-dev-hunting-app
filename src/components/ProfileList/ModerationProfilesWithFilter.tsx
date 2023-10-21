'use client'
import React from 'react'
import styles from './ProfileList.module.scss'
import { ProfileModel } from '@/data/frontend/profile/types'
import { ModerationProfileListItem } from './ModerationProfileListItem'

type Props = {
  data: ProfileModel[]
}

export default function ({ data = [] }: Props) {
  return (
    <div className={styles.profileListCont}>
      {data.map((profile) => (
        <ModerationProfileListItem key={profile.id} data={profile} />
      ))}
    </div>
  )
}
