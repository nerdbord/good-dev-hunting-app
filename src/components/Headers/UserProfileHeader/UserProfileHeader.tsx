import GoBackButton from '@/components/GoBackButton/GoBackButton'
import SocialItems from '@/components/SocialItems/SocialItems'
import { UserProfileHeaderType } from '../types'

import styles from './UserProfileHeader.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

export default function UserProfileHeader({
  userProfile,
  withBackButton,
}: UserProfileHeaderType) {
  return (
    <div
      className={cx('wrapper', {
        [styles.withBackBackButton]: !!withBackButton,
      })}
    >
      {!!withBackButton && <GoBackButton>Go back</GoBackButton>}
      <SocialItems userProfile={userProfile} />
    </div>
  )
}
