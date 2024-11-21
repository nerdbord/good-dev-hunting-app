'use client'

import ModerationBtn from '@/app/[locale]/(moderation)/(components)/ModerationBtn/ModerationBtn'
import { LocaleSwitcher } from '@/app/[locale]/(profile)/(components)/LocaleSwitcher/LocaleSwitcher'
import CreateProfileBtn from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfileBtn/CreateProfileBtn'
import LoginBtn from '@/components/LoginBtn/LoginBtn'
import { I18nNamespaces } from '@/i18n/request'
import { Button, MobileGitHubStarsButton } from '@gdh/ui-system'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import GithubAcc from '../GithubAcc/GithubAcc'
import HunterAcc from '../HunterAcc/HunterAcc'
import LogOutBtn from '../LogOutBtn/LogOutBtn'
import styles from './HamburgerMenuMobileBtn.module.scss'

const HamburgerMenuMobileBtn = ({
  userHasProfile,
  userIsModerator,
  userIsHunter,
}: {
  userHasProfile?: boolean | null | undefined
  userIsModerator?: boolean | null | undefined
  userIsHunter?: boolean | null | undefined
}) => {
  const { data: session } = useSession()
  const t = useTranslations(I18nNamespaces.LoginHunter)
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
                  <LocaleSwitcher />
                  {userIsModerator && <ModerationBtn />}
                </div>
                <MobileGitHubStarsButton />
              </>
            ) : (
              <>
                <div className={styles.wrapper}>
                  {userIsHunter ? (
                    <>
                      <HunterAcc />
                      <LogOutBtn />
                    </>
                  ) : (
                    <>{session?.user && <LogOutBtn />}</>
                  )}
                  {userIsModerator && <ModerationBtn />}

                  {!session?.user && (
                    <>
                      <div className={styles.wrapper}>
                        <LoginBtn variant={'secondary'}>Login</LoginBtn>
                        <LocaleSwitcher />
                      </div>
                      <div className={styles.fixedButtons}>
                        <LoginBtn variant="secondary">
                          {t('joinAsAHunter')}
                        </LoginBtn>
                        <CreateProfileBtn data-testid="create-profile-button" />
                      </div>
                    </>
                  )}
                </div>

                <MobileGitHubStarsButton />
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default HamburgerMenuMobileBtn
