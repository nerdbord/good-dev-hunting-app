import { EditProfileButton } from '@/app/(profile)/(components)/EditProfileButton'
import { TogglePublishButton } from '@/app/(profile)/(components)/TogglePublishButton/TogglePublishButton'
import { ToggleOpenToWork } from '@/app/(profile)/my-profile/(components)/ToggleOpenToWork'
import { ProfileModel } from '@/app/(profile)/types'
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon'
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
      <div className={styles.mobileProfilePreview}>
        <span className={styles.title}>Profile preview</span>
        <div className={styles.toogleMobileView}>
          <ToggleOpenToWork
            profileId={profile.id}
            isOpenForWork={profile.isOpenForWork}
          />
        </div>
      </div>
      <div className={styles.buttonBox}>
        <div className={styles.mobileView}>
          <ToggleOpenToWork
            profileId={profile.id}
            isOpenForWork={profile.isOpenForWork}
          />
        </div>
        {isConnectedToNerdbord ? (
          <p className={styles.nerdbord}>
            <CheckMarkIcon />
            Nerdbord connected
          </p>
        ) : (
          <ConnectToNerdbordButton />
        )}
        <div className={styles.mobileView}>
          <EditProfileButton />
          <TogglePublishButton state={profile.state} profileId={profile.id} />
        </div>
      </div>
    </div>
  )
}

export default ProfileTopBar
