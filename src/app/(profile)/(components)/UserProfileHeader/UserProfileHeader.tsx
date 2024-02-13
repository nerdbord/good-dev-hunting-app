import ContactBtn from '@/app/(profile)/(components)/ContactForm/ContactBtn/ContactBtn'
import { Button } from '@/components/Button/Button'
import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import classNames from 'classnames/bind'
import { UserProfileHeaderType } from '../types'
import styles from './UserProfileHeader.module.scss'

const cx = classNames.bind(styles)

export default function UserProfileHeader({
  userProfile,
  withBackButton,
  isNerdbordConnected,
}: UserProfileHeaderType) {
  const commonClasses = cx('wrapper', {
    [styles.withBackBackButton]: !!withBackButton,
  })

  return (
    <div className={commonClasses}>
      {!!withBackButton && <GoBackButton>Go back</GoBackButton>}
      <div className={styles.actions}>
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
