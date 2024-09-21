// 'use client'

// import type { Locale } from '@/lib/locales'
// import { useLocale } from 'next-intl'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// export const LanguageSwitcher: React.FC = () => {
//   const locale = useLocale() as Locale
//   const router = useRouter()

//   function handleLocaleChange(
//     event: React.ChangeEvent<HTMLSelectElement>,
//   ): void {
//     const newLocale = event.target.value as Locale
//     document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
//     router.refresh()
//   }

//   return (
//     <div>
//       <select value={locale} onChange={handleLocaleChange}>
//         <option value="en">English</option>
//         <option value="pl">Polski</option>
//       </select>
//     </div>
//   )
// }

'use client'

import type { Locale } from '@/lib/locales'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from './LangSwitch.module.scss'

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale() as Locale
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  function handleLocaleChange(newLocale: Locale): void {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <div className={styles.selectContainer}>
      <div className={styles.selectBox} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.selectedOption}>
          <span className={styles.icon}>🌐</span>
          <span className={styles.languageText}>
            {locale === 'en' ? 'English (US)' : 'Polski'}
          </span>
          <span className={styles.arrow}>▾</span>
        </div>
        {isOpen && (
          <div className={styles.selectOptions}>
            <div
              className={styles.option}
              onClick={() => handleLocaleChange('en')}
            >
              <input
                className={styles.radioInput}
                type="radio"
                id="english"
                name="language"
                checked={locale === 'en'}
                readOnly
              />
              <label htmlFor="english" className={styles.radioLabel}>
                <span className={styles.dot} />
                English (US)
              </label>
            </div>
            <div
              className={styles.option}
              onClick={() => handleLocaleChange('pl')}
            >
              <input
                className={styles.radioInput}
                type="radio"
                id="polski"
                name="language"
                checked={locale === 'pl'}
                readOnly
              />
              <label htmlFor="polski" className={styles.radioLabel}>
                <span className={styles.dot} />
                Polski
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
