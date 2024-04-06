import { auth } from '@/auth'
import styles from './VisitorBanner.module.scss'
const VisitorBanner = async () => {
  const session = await auth()

  if (!session?.user) {
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
