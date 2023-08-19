'use client'
import React from 'react'
import { Button } from '@/inputs/Button/Button'
import styles from './DefaultHeader.module.scss'
import logo from '@/assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/dist/client/image'
import { AppRoutes } from '@/utils/routes'

const DefaultHeader = () => {
  const { status, data: session } = useSession()
  const name = session?.user?.name
  const avatar = session?.user?.image
  const profileId = session?.user?.profileId
  const router = useRouter()

  if (status === 'authenticated') {
    return (
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </Link>
        <div className={styles.actions}>
          <div className={styles.frameLogin}>
            <div>
              <p className={styles.githubAccConnected}>
                Connected Github account
              </p>
            </div>
            <div className={styles.githubAcc}>
              {avatar && (
                <Image
                  className={styles.githubAccImg}
                  src={avatar}
                  width={38}
                  height={38}
                  alt="github avatar"
                />
              )}
              <p className={styles.githubAccName}>{name}</p>
            </div>
            {profileId === null ? (
              <Button
                onClick={() => router.push(AppRoutes.createProfile)}
                variant={'primary'}
              >
                Create profile
              </Button>
            ) : (
              <Button
                onClick={() => router.push(AppRoutes.myProfile)}
                variant={'primary'}
              >
                My profile
              </Button>
            )}
          </div>
        </div>
      </header>
    )
  }

  return (
    <header className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <img src={logo.src} alt="Logo" />
        <div className={styles.title}>Good Dev Hunting</div>
      </Link>

      <div className={styles.frameButtons}>
        <Button onClick={() => signIn('github')} variant={'secondary'}>
          Login
          <GithubIcon />
        </Button>
      </div>
    </header>
  )
}
export default DefaultHeader
