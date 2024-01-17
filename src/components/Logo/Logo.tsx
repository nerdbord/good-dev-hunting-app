import React from 'react'
import styles from './Logo.module.scss'
import logo from '@/assets/images/logo.png'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/" className={styles.logo}>
      <img src={logo.src} alt="Logo" />
      <div className={styles.title}>Good Dev Hunting</div>
    </Link>
  )
}

export default Logo
