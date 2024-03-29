import { authOptions } from '@/app/(auth)/auth'
import logo from '@/assets/images/logo.png'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import Link from 'next/link'
import styles from './MyProfileHeader.module.scss'

const MyProfileHeader = async () => {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <header className={styles.wrapper}>
        <Link href={AppRoutes.profiles} className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </Link>
        <div className={styles.actions}>
          <div className={styles.github}>
            <div>
              <p className={styles.githubAccConnected}>
                Connected Github account
              </p>
            </div>
            <div className={styles.githubAcc}>
              {session?.user?.image && (
                <Image
                  className={styles.githubAccImg}
                  src={session.user.image}
                  width={38}
                  height={38}
                  alt="github avatar"
                />
              )}
              <p className={styles.githubAccName}>{session?.user.name}</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default MyProfileHeader
