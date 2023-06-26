'use client'
import React from 'react'
import { Button } from '../Buttons/Button'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import AddIcon from '@/assets/icons/AddIcon'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Header = () => {
  const { data: session, status } = useSession()
  const name = session?.user?.name
  const avatar = session?.user?.image
  const pathname = usePathname()
  const router = useRouter()

  if (
    status === 'authenticated' &&
    pathname === ('/my-profile' || '/create-profile')
  ) {
    return (
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
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
          </div>
        </div>
      </header>
    )
  }

  if (status === 'authenticated') {
    return (
      <header className={styles.wrapper}>
        <Link href="/" className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </Link>
        <div className={styles.actions}>
          <div className={styles.frameLogin}>
            <Button
              onClick={() => router.push('/my-profile')}
              variant={'primary'}
            >
              {' '}
              My profile{' '}
            </Button>
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
      <div className={styles.actions}>
        <div className={styles.frameButtons}>
          <div className={styles.buttons}>
            <Button onClick={() => signIn()} variant={'primary'}>
              Create profile
              <AddIcon />
            </Button>
          </div>
          <div className={styles.buttons}>
            <Button onClick={() => signIn('github')} variant={'secondary'}>
              Login
              <GithubIcon />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
