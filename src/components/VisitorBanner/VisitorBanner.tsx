import { getAuthorizedUser } from '@/app/(auth)/helpers'
import styles from './VisitorBanner.module.scss'
const VisitorBanner = async () => {
  const { user } = await getAuthorizedUser()
  if (!user) {
    return (
      <div className={styles.wrapper}>
        <span>
          Create a free account to get unlimited access to all profiles
        </span>
      </div>
    )
  } else {
    return null
  }
}

export default VisitorBanner
