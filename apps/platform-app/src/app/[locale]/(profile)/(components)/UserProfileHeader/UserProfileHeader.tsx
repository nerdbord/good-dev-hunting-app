import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import { I18nNamespaces } from '@/i18n/request'
import { ensureProtocol } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import classNames from 'classnames/bind'
import { getTranslations } from 'next-intl/server'
import { type UserProfileHeaderType } from '../types'
import styles from './UserProfileHeader.module.scss'

const cx = classNames.bind(styles)

export default async function UserProfileHeader({
  profileId,
  withBackButton,
  isNerdbordConnected,
}: UserProfileHeaderType) {
  const profile = await findProfileById(profileId)
  const t = await getTranslations(I18nNamespaces.UserProfile)

  const socialItemCount =
    (profile.githubUsername ? 1 : 0) +
    (profile.linkedIn ? 1 : 0) +
    (profile.githubUsername && isNerdbordConnected ? 1 : 0)

  const commonClasses = cx('wrapper', {
    [styles.withBackBackButton]: !!withBackButton,
  })

  const wrapClasses = cx({
    [styles.actions]: true,
    [styles.wrap]: socialItemCount > 1,
  })

  return (
    <div className={commonClasses}>
      {withBackButton && (
        <div className={styles.hideOnMobile}>
          <GoBackButton>{t('goBack')}</GoBackButton>
        </div>
      )}
      <div className={wrapClasses}>
        <div className={styles.socialItemsWrapper}>
          <SocialItems
            githubUsername={profile.githubUsername}
            linkedInUrl={ensureProtocol(profile.linkedIn || '')}
            isNerdbordConnected={isNerdbordConnected}
          />
        </div>
        {profile.isOpenForWork ? (
          <div className={styles.buttonWrapper}>
            {/* Note: Button is disabled for now */}
            {/* <ContactBtn /> */}
          </div>
        ) : (
          <Button variant={'primary'} disabled>
            {t('notOpenForWork')}
          </Button>
        )}
      </div>
    </div>
  )
}
