import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import { UserProfileHeaderType } from '../types'

import ContactBtn from '@/app/(profile)/(components)/ContactForm/ContactBtn/ContactBtn'
import { Button } from '@/components/Button/Button'
import classNames from 'classnames/bind'
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
        <SocialItems
          userProfile={userProfile}
          isNerdbordConnected={isNerdbordConnected}
        />
        {userProfile.isOpenForWork ? (
          <ContactBtn userProfile={userProfile} />
        ) : (
          <Button variant={'primary'} disabled>
            Not available for new projects
          </Button>
        )}
      </div>
    </div>
  )
}
