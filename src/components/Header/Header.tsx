'use client'
import React from 'react'
import { Button } from '../Buttons/Button'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import AddIcon from '@/assets/icons/AddIcon'
import { useSession, signIn, signOut } from 'next-auth/react'

const Header = () => {
  const { data: session, status } = useSession()
  console.log(session)
  console.log(status)

  if (status === 'authenticated') {
    return (
      <header className={styles.wrapper}>
        <div className={styles.logo}>
          <img src={logo.src} alt="Logo" />
          <div className={styles.title}>Good Dev Hunting</div>
        </div>
        <div className={styles.actions}>
          <div className={styles.frameLogin}>
            <Button onClick={() => signOut} variant={'primary'}>
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
      <div className={styles.logo}>
        <img src={logo.src} alt="Logo" />
        <div className={styles.title}>Good Dev Hunting</div>
      </div>
      <div className={styles.actions}>
        <div className={styles.frameButtons}>
          <div className={styles.buttons}>
            <Button onClick={() => signIn()} variant={'primary'}>
              Create profile
              <span>
                <AddIcon />
              </span>
            </Button>
          </div>
          <div className={styles.buttons}>
            <Button onClick={() => signIn('github')} variant={'secondary'}>
              Login
              <span>
                <GithubIcon />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
