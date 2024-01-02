import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { TogglePublishButton } from '@/components/TogglePublishButton/TogglePublishButton'
import { EditProfileButton } from '@/components/EditProfileButton'
import { ProfileModel } from '@/data/frontend/profile/types'
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon'
import { ConnectToNerdbordButton } from '@/components/ConnectToNerbordButton/ConnectToNerdbordButton'

const ProfileTopBar = async ({
  profile,
  isConnectedToNerdbord,
}: {
  profile: ProfileModel
  isConnectedToNerdbord: boolean
}) => {
  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        {isConnectedToNerdbord ? (
          <p className={styles.nerdbord}>
            <CheckMarkIcon />
            Nerdbord connected
          </p>
        ) : (
          <ConnectToNerdbordButton />
        )}
        <EditProfileButton />
        <TogglePublishButton state={profile.state} profileId={profile.id} />
      </div>
    </div>
  )
}

export default ProfileTopBar
