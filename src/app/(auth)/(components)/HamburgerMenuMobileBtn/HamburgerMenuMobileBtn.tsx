'use client'
import ModerationBtn from '@/app/(profile)/moderation/(components)/ModerationBtn/ModerationBtn'
import CreateProfileBtn from '@/app/(profile)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import { Button } from '@/components/Button/Button'
import MobileGitHubStarsBtn from '@/components/Button/MobileGitHubStarsBtn'
import { useState } from 'react'
import GithubAcc from '../GithubAcc/GithubAcc'
import { GithubLoginButton } from '../GithubLoginButton/GithubLoginButton'
import styles from './HamburgerMenuMobileBtn.module.scss'

const HamburgerMenuMobileBtn = ({
  userHasProfile,
  userIsModerator,
}: {
  userHasProfile?: boolean | null | undefined
  userIsModerator?: boolean | null | undefined
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
            {userHasProfile ? (
              <>
                <div className={styles.wrapper}>
                  <GithubAcc />
                  {userIsModerator && <ModerationBtn />}
                </div>
                <MobileGitHubStarsBtn />
              </>
            ) : (
              <>
                <div className={styles.wrapper}>
                  <CreateProfileBtn />
                  <GithubLoginButton />
                </div>

                <MobileGitHubStarsBtn />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default HamburgerMenuMobileBtn
