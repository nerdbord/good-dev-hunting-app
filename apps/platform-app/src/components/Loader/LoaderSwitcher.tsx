'use client'

import { AdvancedLoader, HunterLoader } from '@/components/Loader'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'

interface LoaderSwitcherProps {
  message?: string
}

const LoaderSwitcher = ({ message }: LoaderSwitcherProps) => {
  const pathname = usePathname()
  const locale = useLocale()

  const isHome = pathname === `/${locale}` || pathname === '/'

  return isHome ? <HunterLoader /> : <AdvancedLoader />
}

export default LoaderSwitcher
