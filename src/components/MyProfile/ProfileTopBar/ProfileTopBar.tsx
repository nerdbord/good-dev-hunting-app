import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { TogglePublishButton } from '@/components/TogglePublishButton/TogglePublishButton'
import { EditProfileButton } from '@/components/EditProfileButton'
import { ProfileModel } from '@/data/frontend/profile/types'

const ProfileTopBar = async ({ profile }: { profile: ProfileModel }) => {
  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        <EditProfileButton />
        <TogglePublishButton state={profile.state} profileId={profile.id} />
      </div>
    </div>
  )
}

export default ProfileTopBar
