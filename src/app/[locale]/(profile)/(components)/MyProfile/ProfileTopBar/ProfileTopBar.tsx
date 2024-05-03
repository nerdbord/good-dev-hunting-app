import LogOutBtn from '@/app/(auth)/(components)/LogOutBtn/LogOutBtn'
import { EditProfileButton } from '@/app/[locale]/(profile)/(components)/EditProfileButton'
import { TogglePublishButton } from '@/app/[locale]/(profile)/(components)/TogglePublishButton/TogglePublishButton'
import ProfileViews from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/ProfileViews/ProfileViews'
import { ToggleOpenToWork } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/ToggleOpenToWork'
import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { PublishingState } from '@prisma/client'
import styles from './ProfileTopBar.module.scss'

interface ProfileTopBarProps {
  profileId: string
}

const ProfileTopBar = async (props: ProfileTopBarProps) => {
  const profile = await findProfileById(props.profileId)

  const isPending = profile.state === PublishingState.PENDING
  const isRejected = profile.state === PublishingState.REJECTED
  return (
    <div className={styles.titleBox}>
      <div className={styles.mobileProfilePreview}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>Profile preview</span>
          <ProfileViews viewCount={profile.viewCount} />
        </div>

        {!(isPending || isRejected) && (
          <div className={styles.toogleMobileView}>
            <ToggleOpenToWork
              profileId={props.profileId}
              isOpenForWork={profile.isOpenForWork}
            />
          </div>
        )}
      </div>
      <div className={styles.buttonBox}>
        {!(isPending || isRejected) && (
          <div className={styles.mobileView}>
            <ToggleOpenToWork
              profileId={props.profileId}
              isOpenForWork={profile.isOpenForWork}
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
            state={profile.state}
            profileId={props.profileId}
          />
        </div>
      </div>
    </div>
  )
}

export default ProfileTopBar
