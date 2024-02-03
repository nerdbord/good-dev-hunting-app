import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import { UserProfileHeaderType } from '../types'

import ContactBtn from '@/components/ContactForm/ContactBtn/ContactBtn'
import classNames from 'classnames/bind'
import styles from './UserProfileHeader.module.scss'

const cx = classNames.bind(styles)

export default function UserProfileHeader({
  userProfile,
  withBackButton,
}: UserProfileHeaderType) {
  const commonClasses = cx('wrapper', {
    [styles.withBackBackButton]: !!withBackButton,
  })
  return (
    <div className={commonClasses}>
      {!!withBackButton && <GoBackButton>Go back</GoBackButton>}
      <div className={styles.actions}>
        <SocialItems userProfile={userProfile} />
        <ContactBtn userProfile={userProfile} />
      </div>
    </div>
  )
}
