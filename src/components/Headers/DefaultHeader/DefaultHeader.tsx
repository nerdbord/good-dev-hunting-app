'use client'
import React from 'react'
import { Button } from '@/inputs/Button/Button'
import styles from './DefaultHeader.module.scss'
import logo from '@/assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import AddIcon from '@/assets/icons/AddIcon'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const DefaultHeader = () => {
  const { data: session, status } = useSession()

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

      <div className={styles.frameButtons}>
        <Button onClick={() => signIn('github')} variant={'secondary'}>
          Login
          <GithubIcon />
        </Button>
        <Button onClick={() => signIn()} variant={'primary'}>
          Create profile
          <AddIcon />
        </Button>
      </div>
    </header>
  )
}
export default DefaultHeader
