'use client'
import { LocaleSwitcher } from '@/app/[locale]/(profile)/(components)/LocaleSwitcher/LocaleSwitcher'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogoLight } from '../UI/LogoLight/LogoLight'
import styles from './HunterHeader.module.scss'

export enum HunterHeaderVariant {
  HunterHeaderVariant = 'hunterLanding',
}

export const HunterHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const t = useTranslations(I18nNamespaces.HunterHeader)
  const router = useRouter()

  const handleAddJob = () => {
    router.push(AppRoutes.postJob)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev)
  }

  return (
    <header id="HunterHeader" className={styles.wrapper}>
      <div className={styles.container}>
        <LogoLight />
        <div className={styles.menuDesktop}>
          <LocaleSwitcher variant={HunterHeaderVariant.HunterHeaderVariant} />
          <Button variant="allpurple" onClick={handleAddJob}>
            {t('addJob')}
          </Button>
        </div>
        <div className={styles.menuMobile}>
          <button className={styles.mobilebutton} onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? 'X' : 'Menu'}
          </button>
          <div
            className={`${styles.mobileMenuContent} ${
              isMobileMenuOpen ? styles.menuOpen : ''
            }`}
          >
            <div className={styles.buttonBox}>
              <LocaleSwitcher
                variant={HunterHeaderVariant.HunterHeaderVariant}
              />
              <Button variant="allpurple" onClick={handleAddJob}>
                {t('addJob')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
