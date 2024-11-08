'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery'
import useOutsideClick from '@/hooks/useOutsideClick'
import { I18nNamespaces } from '@/i18n'
import { locales } from '@/i18n.config'
import { GlobeIcon } from '@gdh/ui-system/icons'
import classNames from 'classnames/bind'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './LocaleSwitcherSelect.module.scss'

const cx = classNames.bind(styles)

type LocaleSwitcherSelectProps = {
  defaultValue: string
  label: string
}

export const LocaleSwitcherSelect = ({
  defaultValue,
  label,
}: LocaleSwitcherSelectProps) => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)
  const tt = useTranslations(I18nNamespaces.Buttons)
  const router = useRouter()
  let currentPath = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(defaultValue)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const isMobile = useMediaQuery()

  const buttonClassName = cx('button', {
    // Width classes
    btnWidthIsMobileEn: isMobile && selectedLocale === 'en',
    btnWidthIsMobilePl: isMobile && selectedLocale === 'pl',
    btnWidthIsDesktopEn: !isMobile && selectedLocale === 'en',
    btnWidthIsDesktopPl: !isMobile && selectedLocale === 'pl',

    // Padding classes
    btnPaddingIsMobileEn: isMobile && selectedLocale === 'en',
    btnPaddingIsMobilePl: isMobile && selectedLocale === 'pl',
    btnPaddingDesktop: !isMobile,

    // Color classes
    isMobileColorLight02: isMobile,
    isOpenColorMain03: !isMobile && isOpen,
  })

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setIsOpen((prev) => !prev)
  }

  useOutsideClick(dropdownRef, () => {
    setIsOpen(false)
    setArrow('IoIosArrowDown')
  })

  const onLocaleChange = (nextLocale: string) => {
    const localeRegex = /^\/(pl|en)/
    currentPath = currentPath.replace(localeRegex, '')
    setSelectedLocale(nextLocale)
    setIsOpen(false)
    startTransition(() => {
      router.replace(`/${nextLocale}${currentPath}`)
      router.refresh()
    })
  }

  return (
    <div
      className={`${styles.container} ${isOpen ? styles.open : ''}`}
      ref={dropdownRef}
    >
      <p className={styles.srOnly}>
        {t('label')}
        {label}
      </p>
      <button
        className={buttonClassName}
        onClick={handleDropdown}
        disabled={isPending}
      >
        <span
          className={`${styles.buttonIcon} ${
            isOpen && !isMobile ? styles.buttonIconOpen : ''
          }`}
        >
          <GlobeIcon />
        </span>
        <span
          className={`localeName ${
            isOpen && !isMobile ? styles.localeNameOpen : ''
          }`}
        >
          {t(`locale.${selectedLocale}`)}
        </span>
        <span className={styles.arrow}>
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      {isOpen && (
        <div className={isMobile ? styles.mobileDropdown : styles.dropdown}>
          {isMobile && (
            <div className={styles.applyBtnLanguageContainer}>
              <span className={styles.label}>{t('dropdownOpenLabel')}</span>
              <button
                className={styles.applyBtn}
                onClick={() => setIsOpen(false)}
              >
                {tt('apply')}
              </button>
            </div>
          )}
          <div className={styles.options}>
            {locales.map((locale) => (
              <label key={locale} className={styles.dropdownItem}>
                <input
                  type="radio"
                  name="locale"
                  value={locale}
                  checked={selectedLocale === locale}
                  onChange={() => onLocaleChange(locale)}
                />
                {t(`locale.${locale}`)}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
