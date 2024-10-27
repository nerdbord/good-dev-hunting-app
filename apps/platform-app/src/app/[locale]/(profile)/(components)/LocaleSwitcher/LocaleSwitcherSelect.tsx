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
import { locales } from '@/i18n'
import { GlobeIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
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
  const t = useTranslations()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLocale, setSelectedLocale] = useState(defaultValue)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownActive, setDropdownActive] = useState(false)
  const [arrow, setArrow] = useState('IoIosArrowDown')

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
  }

  useOutsideClick(
    dropdownRef,
    () => setDropdownActive(false),
    () => setArrow('IoIosArrowDown'),
  )

  const closeDropdown = () => {
    setDropdownActive(false)
    setArrow('IoIosArrowDown')
  }

  const onLocaleChange = (nextLocale: string) => {
    setSelectedLocale(nextLocale)
    setIsOpen(false)
    startTransition(() => {
      router.replace(`/${nextLocale}`)
    })
  }

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <button
        className={styles.button}
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isPending}
      >
        <span className={styles.buttonIcon}>
          <GlobeIcon />
        </span>
        {t(`locale.${selectedLocale}`)}
        <span className={styles.arrow}>
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </span>
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
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
