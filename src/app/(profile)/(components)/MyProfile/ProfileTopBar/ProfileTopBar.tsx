import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { EditProfileButton } from '@/app/(profile)/(components)/EditProfileButton'
import { TogglePublishButton } from '@/app/(profile)/(components)/TogglePublishButton/TogglePublishButton'
import { ToggleOpenToWork } from '@/app/(profile)/my-profile/(components)/ToggleOpenToWork'
import { ProfileModel } from '@/app/(profile)/types'
import CheckMarkIcon from '@/assets/icons/CheckMarkIcon'
import { PublishingState } from '@prisma/client'
import { ConnectToNerdbordButton } from '../../ConnectToNerbordButton/ConnectToNerdbordButton'
import styles from './ProfileTopBar.module.scss'

const ProfileTopBar = async ({
  profile,
  isConnectedToNerdbord,
}: {
  profile: ProfileModel
  isConnectedToNerdbord: boolean
}) => {
  const isPending = profile.state === PublishingState.PENDING
  const isRejected = profile.state === PublishingState.REJECTED
  return (
    <div className={styles.titleBox}>
      <div className={styles.mobileProfilePreview}>
        <span className={styles.title}>Profile preview</span>

        {!(isPending || isRejected) && (
          <div className={styles.toogleMobileView}>
            <ToggleOpenToWork
              profileId={profile.id}
              isOpenForWork={profile.isOpenForWork}
            />
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
        {!(isPending || isRejected) && (
          <div className={styles.mobileView}>
            <ToggleOpenToWork
              profileId={profile.id}
              isOpenForWork={profile.isOpenForWork}
            />
          </div>
        )}
        {isConnectedToNerdbord ? (
          <div className={styles.conectAndLogOutWrapper}>
            <p className={styles.nerdbord}>
              <CheckMarkIcon />
              Nerdbord connected
            </p>
            <div className={styles.toogleMobileView}>
              <LogOutBtn />
            </div>
          </div>
        ) : (
          <div className={styles.conectAndLogOutWrapper}>
            <ConnectToNerdbordButton />
            <div className={styles.toogleMobileView}>
              <LogOutBtn />
            </div>
          </div>
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
