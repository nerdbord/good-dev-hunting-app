'use client'

import { updatePreferredLanguage } from '@/app/[locale]/(auth)/_actions/mutations/updatePreferredLanguage'
import { useSession } from 'next-auth/react'
import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function AuthLocaleHandler() {
  const { data: session, status, update: updateSession } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()
  const isHandlingLocale = useRef(false) // Flag to prevent multiple redirects

  useEffect(() => {
    if (
      status === 'authenticated' &&
      session?.user &&
      !isHandlingLocale.current
    ) {
      const userLang = session.user.preferredLanguage
      // Condition 1: First login or missing preferred language
      if (!userLang || userLang === '') {
        // Check if language is unset
        isHandlingLocale.current = true // Set the flag
        updatePreferredLanguage(currentLocale)
          .then((updatedUser) => {
            return updateSession({
              ...session,
              user: {
                ...session.user,
                preferredLanguage: updatedUser.preferredLanguage,
              },
            })
          })
          .then(() => {
            isHandlingLocale.current = false // Reset the flag after completion
          })
          .catch((err) => {
            console.error(
              'AuthLocaleHandler: Failed to set initial language preference:',
              err,
            )
            isHandlingLocale.current = false // Reset the flag on error
          })
      }
    }
  }, [status, session, currentLocale, pathname, router, updateSession])

  // This component does not render anything
  return null
}
