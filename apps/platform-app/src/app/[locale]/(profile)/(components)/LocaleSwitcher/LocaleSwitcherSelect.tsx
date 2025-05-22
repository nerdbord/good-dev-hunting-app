'use client'

import { updatePreferredLanguage } from '@/app/[locale]/(auth)/_actions'
import { HunterHeaderVariant } from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import useOutsideClick from '@/hooks/useOutsideClick'
import { usePathname, useRouter } from '@/i18n/navigation'
import { I18nNamespaces } from '@/i18n/request'
import { routing, type Locale } from '@/i18n/routing'
import { GlobeIcon } from '@gdh/ui-system/icons'
import classNames from 'classnames/bind'
import { useSession } from 'next-auth/react'
import { useLocale, useTranslations } from 'next-intl'
import { useRef, useState, useTransition } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './LocaleSwitcherSelect.module.scss'

const cx = classNames.bind(styles)

type LocaleSwitcherSelectProps = {
  label: string
  variant?: HunterHeaderVariant
}

export const LocaleSwitcherSelect = ({
  label,
  variant,
}: LocaleSwitcherSelectProps) => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)
  const router = useRouter()
  const { data: session, update: updateSession } = useSession()
  const currentPathWithoutLocale = usePathname()
  const currentLocale = useLocale()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
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

  const onLocaleChange = (nextLocale: Locale) => {
    setIsOpen(false)
    setArrow('IoIosArrowDown')
    startTransition(() => {
      router.push(
        { pathname: currentPathWithoutLocale },
        { locale: nextLocale },
      )

      // Update preference in DB and session if user is logged in
      if (session?.user && session.user.language !== nextLocale) {
        updatePreferredLanguage(nextLocale)
          .then((result) => {
            if (result?.success) {
              updateSession({
                ...session,
                user: {
                  ...session.user,
                  language: result.language,
                },
              })
            } else {
              console.warn(
                '>>> LocaleSwitcher: DB update action did not indicate success.',
              )
            }
          })
          .catch((err) => {
            console.error(
              '>>> LocaleSwitcher: Failed to update language preference (catch):',
              err,
            )
          })
      }
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
          {t(`locale.${currentLocale}`)}
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
            </div>
          )}
          <div className={styles.options}>
            {routing.locales.map((locale) => (
              <label key={locale} className={styles.dropdownItem}>
                <input
                  type="radio"
                  name="locale"
                  value={locale}
                  checked={currentLocale === locale}
                  onChange={() => onLocaleChange(locale)}
                  disabled={isPending}
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
