import { authOptions } from '@/app/(auth)/auth'
import { getServerSession } from 'next-auth'
import styles from './VisitorBanner.module.scss'

const VisitorBanner = async () => {
  const session = await getServerSession(authOptions)

  return (
    <>
      {!session?.user ? (
        <div className={styles.wrapper}>
          <span>
            Create a free account to get unlimited access to all profiles
          </span>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default VisitorBanner
