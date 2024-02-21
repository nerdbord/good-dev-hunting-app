import ViewIcon from '@/assets/icons/ViewIcon'

import styles from './ProfileViews.module.scss'

const ProfileViews = ({ ViewCount }: { ViewCount: number }) => {
  return (
    <span className={styles.profileViews}>
      <ViewIcon />
      Profile views:
      <span>{ViewCount}</span>
    </span>
  )
}

export default ProfileViews
