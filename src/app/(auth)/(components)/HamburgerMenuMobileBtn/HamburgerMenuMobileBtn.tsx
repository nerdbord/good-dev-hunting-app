'use client'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { Button } from '@/components/Button/Button'
import GithubStarsButton from '@/components/Button/GitHubStarsBtn'
import { useState } from 'react'
import { GithubLoginButton } from '../GithubLoginButton/GithubLoginButton'
import styles from './HamburgerMenuMobileBtn.module.scss'

const HamburgerMenuMobileBtn = ({
  userProfile,
}: {
  userProfile?: boolean | null | undefined
}) => {
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
            {userProfile ? (
              <>
                <GithubLoginButton />
                <GithubStarsButton />
              </>
            ) : (
              <>
                <CreateProfileBtn /> <GithubStarsButton />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default HamburgerMenuMobileBtn
