import React from 'react'
import styles from './Logo.module.scss'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'
import { AppRoutes } from '@/utils/routes'

const Logo = () => {
  return (
    <Link href={AppRoutes.home} className={styles.logo}>
      <img src={logo.src} alt="Logo" />
      <div className={styles.title}>Good Dev Hunting</div>
    </Link>
  )
}

export default Logo
