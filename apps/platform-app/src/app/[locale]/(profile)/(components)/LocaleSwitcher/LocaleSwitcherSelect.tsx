// type LocaleSwitcherSelectProps = {
//   children: ReactNode
//   defaultValue: string
//   label: string
// }
// export const LocaleSwitcherSelect = ({
//   children,
//   defaultValue,
//   label,
// }: LocaleSwitcherSelectProps) => {
//   console.log('CHILDREN: ', children)
//   console.log('DEFAULT: ', defaultValue)
//   console.log('LABEL: ', label)

//   const t = useTranslations()

//   const router = useRouter()
//   const [isPending, startTransition] = useTransition()
//   const [isOpen, setIsOpen] = useState(false)
//   const [selectedLocale, setSelectedLocale] = useState(defaultValue)

// function onLocaleChange(nextLocale: string) {
//   setSelectedLocale(nextLocale)
//   setIsOpen(false)
//   startTransition(() => {
//     router.replace(`/${nextLocale}`)
//   })
// }
// return (
// <label className=''>
//   <p className="sr-only">{label}</p>
//   <select defaultValue={defaultValue}>{children}</select>
// </label>

'use client'

import useOutsideClick from '@/hooks/useOutsideClick'
import { I18nNamespaces } from '@/i18n'
import { locales } from '@/i18n.config'
import { GlobeIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState, useTransition } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './LocaleSwitcherSelect.module.scss'

type LocaleSwitcherSelectProps = {
  defaultValue: string
  label: string
}

export const LocaleSwitcherSelect = ({
  defaultValue,
  label,
}: LocaleSwitcherSelectProps) => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)
  const router = useRouter()
  let currentPath = usePathname()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(defaultValue)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [arrow, setArrow] = useState('IoIosArrowDown')

  const buttonWidth = selectedLocale === 'en' ? '178px' : '140px';

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setIsOpen((prev) => !prev)
  }

  useOutsideClick(
    dropdownRef,
    () => setIsOpen(false),
    () => setArrow('IoIosArrowDown'),
  )

  // const closeDropdown = () => {
  //   setIsOpen(false)
  //   setArrow('IoIosArrowDown')
  // }

  const onLocaleChange = (nextLocale: string) => {
    // Usuwa istniejący segment języka na początku ścieżki, jeśli istnieje
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
      <p className={styles.srOnly}>{label}</p>
      <button
        className={styles.button}
        onClick={handleDropdown}
        style={{ width: buttonWidth, color: isOpen ? '#A687FF' : '#E2EAF1' }}
        disabled={isPending}
      >
        <span className={`${styles.buttonIcon} ${isOpen ? styles.buttonIconOpen : ''}`}>
          <GlobeIcon />
        </span>
        <span className="localeName">{t(`locale.${selectedLocale}`)}</span>
        <span className={styles.arrow}>
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdown} style={{ width: '178px' }}>
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
      )}
    </div>
  )
}
