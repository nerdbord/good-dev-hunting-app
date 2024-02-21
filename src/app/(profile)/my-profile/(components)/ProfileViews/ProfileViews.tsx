import ViewIcon from '@/assets/icons/ViewIcon'

import styles from './ProfileViews.module.scss'

const ProfileViews = ({ viewCount }: { viewCount: number }) => {
  return (
    <div className={styles.profileViewsContainer}>
      <div className={styles.profileViews}>
        <ViewIcon />
        Profile views:
        <span>{viewCount}</span>
      </div>
    </div>
  )
}

export default ProfileViews
