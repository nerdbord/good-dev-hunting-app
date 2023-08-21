'use client'
import React from 'react'
import { Button } from '@/inputs/Button/Button'
import styles from './DefaultHeader.module.scss'
import logo from '@/assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import Link from 'next/link'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

const DefaultHeader = () => {
  const { status, data: session } = useSession()
  /*   const name = session?.user?.name
  const avatar = session?.user?.image
  const profileId = session?.user?.profileId */
  const router = useRouter()

  return (
    <header className={styles.wrapper}>
      <Link href="/" className={styles.logo}>
        <img src={logo.src} alt="Logo" />
        <div className={styles.title}>Good Dev Hunting</div>
      </Link>
      {status === 'authenticated' ? (
        <div className={styles.frameButtons}>
          <Button
            onClick={() => router.push(AppRoutes.myProfile)}
            variant={'primary'}
          >
            My profile
          </Button>
        </div>
      ) : (
        <div className={styles.frameButtons}>
          <Button onClick={() => signIn('github')} variant={'secondary'}>
            Login
            <GithubIcon />
          </Button>
          <Button onClick={() => signIn()} variant={'primary'}>
            Create profile
            {/*             <AddIcon /> */}
          </Button>
        </div>
      )}
    </header>
  )
}

export default DefaultHeader
