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

export const HunterHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [menuVisible, setMenuVisible] = useState(false)
  const t = useTranslations(I18nNamespaces.HunterHeader)
  const router = useRouter()

  const handleAddJob = () => {
    router.push(AppRoutes.postJob)
  }

  const toggleMobileMenu = () => {
    if (isMobileMenuOpen) {
      setMenuVisible(false)
      setTimeout(() => {
        setIsMobileMenuOpen(false)
      }, 300)
    } else {
      setIsMobileMenuOpen(true)
      setTimeout(() => {
        setMenuVisible(true)
      }, 10)
    }
  }

  return (
    <section id="HunterHeader" className={styles.wrapper}>
      <LogoLight />
      <div className={styles.menuDesktop}>
        <LocaleSwitcher />
        <Button variant="allpurple" onClick={handleAddJob}>
          {t('addJob')}
        </Button>
      </div>
      <div className={styles.menuMobile}>
        <button className={styles.mobilebutton} onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? 'X' : 'Menu'}
        </button>
        {isMobileMenuOpen && (
          <div
            className={`${styles.mobileMenuContent} ${
              menuVisible ? styles.visible : styles.hidden
            }`}
          >
            <div className={styles.buttonBox}>
              <LocaleSwitcher />
              <Button variant="allpurple" onClick={handleAddJob}>
                {t('addJob')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
