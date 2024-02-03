import { ProfileModel } from '@/app/(profile)/types'
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon'
import { EditProfileButton } from '@/components/EditProfileButton'
import { TogglePublishButton } from '@/components/TogglePublishButton/TogglePublishButton'
import { ConnectToNerdbordButton } from '../../ConnectToNerbordButton/ConnectToNerdbordButton'
import styles from './ProfileTopBar.module.scss'

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