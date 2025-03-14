'use client'

import { HunterHeaderVariant } from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useOutsideClick from '@/hooks/useOutsideClick'
import { I18nNamespaces } from '@/i18n/request'
import { routing } from '@/i18n/routing'
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
  variant?: HunterHeaderVariant
}

export const LocaleSwitcherSelect = ({
  defaultValue,
  label,
  variant,
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

  const containerClassName = cx('container', {
    open: isOpen,
    hunterLanding: variant === HunterHeaderVariant.HunterHeaderVariant,
  })
  const buttonClassName = cx('button', {
    hunterLanding: variant === HunterHeaderVariant.HunterHeaderVariant,
    hunterLandingMobile:
      variant === HunterHeaderVariant.HunterHeaderVariant && isMobile,
  })
  const buttonIconClassName = cx('buttonIcon', {
    hunterLanding: variant === HunterHeaderVariant.HunterHeaderVariant,
  })
  const localeNameClassName = cx('localeName', {
    hunterLanding: variant === HunterHeaderVariant.HunterHeaderVariant,
  })
  const dropdownClassName = cx({
    mobileDropdown: isMobile,
    dropdown: !isMobile,
    hunterLanding: variant === HunterHeaderVariant.HunterHeaderVariant,
  })

  return (
    <div className={containerClassName} ref={dropdownRef}>
      <p className={styles.srOnly}>
        {t('label')}
        {label}
      </p>
      <button
        className={buttonClassName}
        onClick={handleDropdown}
        disabled={isPending}
      >
        <span className={buttonIconClassName}>
          <GlobeIcon />
        </span>
        <span className={localeNameClassName}>
          {t(`locale.${selectedLocale}`)}
        </span>
        <span className={styles.arrow}>
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      {isOpen && (
        <div className={dropdownClassName}>
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
            {routing.locales.map((locale) => (
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
