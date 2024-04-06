import ContactBtn from '@/app/(profile)/(components)/ContactForm/ContactBtn/ContactBtn'
import { Button } from '@/components/Button/Button'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import classNames from 'classnames/bind'
import { type UserProfileHeaderType } from '../types'
import styles from './UserProfileHeader.module.scss'

const cx = classNames.bind(styles)

export default function UserProfileHeader({
  userProfile,
  withBackButton,
  isNerdbordConnected,
}: UserProfileHeaderType) {
  const socialItemCount =
    (userProfile.githubUsername ? 1 : 0) +
    (userProfile.linkedIn ? 1 : 0) +
    (userProfile.githubUsername && isNerdbordConnected ? 1 : 0)

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
          <GoBackButton>Go back</GoBackButton>
        </div>
      )}
      <div className={wrapClasses}>
        <div className={styles.socialItemsWrapper}>
          <SocialItems
            userProfile={userProfile}
            isNerdbordConnected={isNerdbordConnected}
          />
        </div>
        {userProfile.isOpenForWork ? (
          <div className={styles.buttonWrapper}>
            <ContactBtn userProfile={userProfile} />
          </div>
        ) : (
          <Button variant={'primary'} disabled>
            Not available for new projects
          </Button>
        )}
      </div>
    </div>
  )
}
