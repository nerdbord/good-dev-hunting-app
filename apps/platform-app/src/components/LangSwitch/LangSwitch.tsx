'use client'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'

// export const LanguageSwitcher = () => {
//   const pathname = usePathname()
//   const searchParams = useSearchParams()
//   const router = useRouter()

//   const changeLanguage = (locale: string) => {
//     const currentParams = searchParams ? `?${searchParams.toString()}` : ''
//     router.push(`${locale}${pathname}${currentParams}`)
//   }

//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('pl')}>Polski</button>
//     </div>
//   )
// }

'use client'

// import { usePathname, useRouter } from 'next/navigation'

// export const LanguageSwitcher = () => {
//   const router = useRouter()
//   const pathname = usePathname()

//   const changeLanguage = (locale: string) => {
//     router.push(`/${locale}${pathname}`)
//   }

//   return (
//     <div>
//       <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('pl')}>Polski</button>
//     </div>
//   )
// }
// 'use client'

// import type { Locale } from '@/lib/locales'

// import { useLocale } from 'next-intl'
// import { useRouter } from 'next/navigation'
// import React from 'react'

// export const LanguageSwitcher: React.FC = () => {
//   const locale = useLocale() as Locale
//   const router = useRouter()

//   function handleLocaleChange(newLocale: Locale): void {
//     if (locale === 'pl') {
//       document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
//       router.refresh()
//     }
//   }

//   return (
//     <div>
//       <button
//         onClick={() => {
//           handleLocaleChange('en')
//         }}
//       >
//         EN
//       </button>
//     </div>
//   )
// }

'use client'

import type { Locale } from '@/lib/locales'
import { useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import React from 'react'

export const LanguageSwitcher: React.FC = () => {
  const locale = useLocale() as Locale
  const router = useRouter()

  function handleLocaleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void {
    const newLocale = event.target.value as Locale
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.refresh()
  }

  return (
    <div>
      <select value={locale} onChange={handleLocaleChange}>
        <option value="en">English</option>
        <option value="pl">Polski</option>
      </select>
    </div>
  )
}
