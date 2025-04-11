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
      // Assuming the field is non-nullable, this condition might not be strictly necessary,
      // but it's kept for safety in case a migration went differently.
      if (!userLang || userLang === '') {
        // Check if language is unset
        isHandlingLocale.current = true // Set the flag
        console.log(
          `AuthLocaleHandler: Setting initial language to ${currentLocale} for user ${session.user.id}`,
        )
        updatePreferredLanguage(currentLocale)
          .then((updatedUser) => {
            console.log(
              `AuthLocaleHandler: DB updated for user ${session.user.id}, new lang: ${updatedUser.preferredLanguage}`,
            )
            // Update the client-side session
            return updateSession({
              ...session,
              user: {
                ...session.user,
                preferredLanguage: updatedUser.preferredLanguage,
              },
            })
          })
          .then(() => {
            console.log(
              `AuthLocaleHandler: Session updated for user ${session.user.id}`,
            )
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
      // Condition 2: Authenticated user is on a page with a different locale than preferred
      else if (userLang !== currentLocale) {
        isHandlingLocale.current = true // Set the flag
        console.log(
          `AuthLocaleHandler: Redirecting user ${session.user.id} from /${currentLocale} to /${userLang}`,
        )
        // Remove current locale segment from pathname
        const pathWithoutLocale = pathname.startsWith(`/${currentLocale}`)
          ? pathname.substring(`/${currentLocale}`.length) || '/'
          : pathname // If there's no locale segment (e.g., with as-needed), keep the path

        // Build new path with preferred locale
        const targetPath = `/${userLang}${pathWithoutLocale}`

        // Use replace to avoid browser history issues
        router.replace(targetPath)
        // Do not reset the flag here because the redirect will reload the page and re-trigger the hook
      }
    }
  }, [status, session, currentLocale, pathname, router, updateSession])

  // This component does not render anything
  return null
}
