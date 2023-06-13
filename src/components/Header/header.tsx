'use client'
import React, { useState } from 'react'
import { ButtonPrimary } from '../ButtonPrimary/buttonPrimary'
import { ButtonSecondary } from '../ButtonSecondary/buttonSecondary'
import styles from './header.module.scss'
import logo from '../../assets/images/logo.png'
import GithubIcon from '@/assets/icons/githubIcon'
import AddIcon from '@/assets/icons/addIcon'

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
            <ButtonPrimary onClick={handleLogOut}> My profile </ButtonPrimary>
          </div>
        ) : (
          <div className={styles.frameButtons}>
            <div className={styles.buttons}>
              <ButtonPrimary onClick={handleLogin}>
                Create profile
                <span>
                  <AddIcon />
                </span>
              </ButtonPrimary>
            </div>
            <div className={styles.buttons}>
              <ButtonSecondary onClick={handleLogin}>
                Login
                <span>
                  <GithubIcon />
                </span>
              </ButtonSecondary>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
export default Header
