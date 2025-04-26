import { createNavigation } from 'next-intl/navigation'
import { defaultLocale, localePrefix, locales, pathnames } from './routing'

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation({ locales, localePrefix, pathnames, defaultLocale })
