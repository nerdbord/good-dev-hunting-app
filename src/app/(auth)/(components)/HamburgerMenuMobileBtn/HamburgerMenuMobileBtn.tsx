'use client'
import { Button } from '@/components/Button/Button'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { useState } from 'react'
import { GithubLoginButton } from '../GithubLoginButton/GithubLoginButton'
import styles from './HamburgerMenuMobileBtn.module.scss'

const HamburgerMenuMobileBtn = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const handleOpenMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleCloseMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <div className={styles.menu}>
      <Button onClick={handleOpenMenu} variant="standard">
        {isMenuOpen ? 'X' : 'Menu'}
      </Button>
      {isMenuOpen && (
        <>
          <div className={styles.overlay} onClick={handleCloseMenu}></div>
          <div className={styles.hamburger}>
            <GithubLoginButton />
            <GithubStarsButton />
          </div>
        </>
      )}
    </div>
  )
}

export default HamburgerMenuMobileBtn
