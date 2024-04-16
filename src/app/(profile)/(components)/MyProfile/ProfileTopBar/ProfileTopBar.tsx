import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { EditProfileButton } from '@/app/(profile)/(components)/EditProfileButton'
import { TogglePublishButton } from '@/app/(profile)/(components)/TogglePublishButton/TogglePublishButton'
import ProfileViews from '@/app/(profile)/(routes)/my-profile/(components)/ProfileViews/ProfileViews'
import { ToggleOpenToWork } from '@/app/(profile)/(routes)/my-profile/(components)/ToggleOpenToWork'
import { findProfileById } from '@/app/(profile)/_actions'
import { ProfileModel } from '@/app/(profile)/_models/profile.model'
import { PublishingState } from '@prisma/client'
import styles from './ProfileTopBar.module.scss'

interface ProfileTopBarProps {
  profileId: string
}

const ProfileTopBar = async (props: ProfileTopBarProps) => {
  const profile = await findProfileById(props.profileId)
  const profileModel = new ProfileModel(profile)

  const isPending = profileModel.state === PublishingState.PENDING
  const isRejected = profileModel.state === PublishingState.REJECTED
  return (
    <div className={styles.titleBox}>
      <div className={styles.mobileProfilePreview}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Profile preview</span>
          <ProfileViews viewCount={profileModel.viewCount} />
        </div>

        {!(isPending || isRejected) && (
          <div className={styles.toogleMobileView}>
            <ToggleOpenToWork
              profileId={props.profileId}
              isOpenForWork={profileModel.isOpenForWork}
            />
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
        {!(isPending || isRejected) && (
          <div className={styles.mobileView}>
            <ToggleOpenToWork
              profileId={props.profileId}
              isOpenForWork={profileModel.isOpenForWork}
            />
          </div>
        )}
        <div className={styles.conectAndLogOutWrapper}>
          {/* TODO: Disabling for now */}
          {/*{isConnectedToNerdbord ? (*/}
          {/*  <p className={styles.nerdbord}>*/}
          {/*    <CheckMarkIcon />*/}
          {/*    Nerdbord connected*/}
          {/*  </p>*/}
          {/*) : (*/}
          {/*  <ConnectToNerdbordButton />*/}
          {/*)}*/}
          <div className={styles.toogleMobileView}>
            <LogOutBtn />
          </div>
        </div>

        <div className={styles.mobileView}>
          <EditProfileButton />
          <TogglePublishButton
            state={profileModel.state}
            profileId={props.profileId}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileTopBar
