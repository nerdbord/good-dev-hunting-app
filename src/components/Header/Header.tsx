'use client'
import React from 'react'
import { Button } from '../Buttons/Button'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import AddIcon from '@/assets/icons/AddIcon'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <header className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </div>
        <div className={styles.actions}>
          <div className={styles.frameLogin}>
            <Button onClick={() => signOut()} variant={'primary'}>
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
