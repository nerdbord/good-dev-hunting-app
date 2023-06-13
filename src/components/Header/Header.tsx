'use client'
import React, { useState } from 'react'
import { Button } from '../Buttons/Button'
import styles from './Header.module.scss'
import logo from '../../assets/images/logo.png'
import GithubIcon from '@/assets/icons/GithubIcon'
import AddIcon from '@/assets/icons/AddIcon'

const Header = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const handleLogin = () => {
    setLoggedIn(true)
  }

  const handleLogOut = () => {
    setLoggedIn(false)
  }

  return (
    <header className={styles.wrapper}>
      <div className={styles.logo}>
        <img src={logo.src} alt="Logo" />
        <div className={styles.title}>Good Dev Hunting</div>
      </div>
      <div className={styles.actions}>
        {loggedIn ? (
          <div className={styles.frameLogin}>
            <Button onClick={handleLogOut} variant={'primary'}> My profile </Button>
          </div>
        ) : (
          <div className={styles.frameButtons}>
            <div className={styles.buttons}>
              <Button onClick={handleLogin} variant={'primary'}>
                Create profile
                <span>
                  <AddIcon />
                </span>
              </Button>
            </div>
            <div className={styles.buttons}>
              <Button onClick={handleLogin} variant={'secondary'}>
                Login
                <span>
                  <GithubIcon />
                </span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
