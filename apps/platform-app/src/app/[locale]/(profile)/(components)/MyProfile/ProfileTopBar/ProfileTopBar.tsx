import LogOutBtn from '@/app/[locale]/(auth)/(components)/LogOutBtn/LogOutBtn'
import { EditProfileButton } from '@/app/[locale]/(profile)/(components)/EditProfileButton'
import { TogglePublishButton } from '@/app/[locale]/(profile)/(components)/TogglePublishButton/TogglePublishButton'
import { ToggleOpenToWork } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/ToggleOpenToWork'
import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { I18nNamespaces } from '@/i18n'
import { PublishingState } from '@prisma/client'
import { getTranslations } from 'next-intl/server'
import styles from './ProfileTopBar.module.scss'
import { ProfileViews } from '@gdh/ui-system'

interface ProfileTopBarProps {
  profileId: string
}

const ProfileTopBar = async (props: ProfileTopBarProps) => {
  const t = await getTranslations(I18nNamespaces.Index)
  const profile = await findProfileById(props.profileId)

  const isPending = profile.state === PublishingState.PENDING
  const isRejected = profile.state === PublishingState.REJECTED
  const viewCount = profile.viewCount + profile.profileViews.length

  return (
    <div className={styles.titleBox}>
      <div className={styles.mobileProfilePreview}>
        <div className={styles.titleContainer}>
          <span className={styles.title}>{t('preview')}</span>
          <ProfileViews viewCount={viewCount}>{t('profileViews')}</ProfileViews>
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
