'use client'

import { AppRoutes } from '@/utils/routes'
import classNames from 'classnames/bind'
import { useLocale } from 'next-intl'
import { usePathname } from 'next/navigation'
import styles from './Loader.module.scss'

const cx = classNames.bind(styles)

export enum LoaderVariant {
  Default = 'defaultLoader',
  Hunter = 'hunterLoader',
}

interface LoaderProps {
  children?: React.ReactNode
  variant?: LoaderVariant
}

export const Loader = ({ children, variant }: LoaderProps) => {
  const pathname = usePathname()
  const locale = useLocale()

  const isHome = pathname === AppRoutes.home || pathname === `/${locale}`
  const loaderVariant =
    variant ?? (isHome ? LoaderVariant.Hunter : LoaderVariant.Default)

  return (
    <div
      className={cx('loaderWrapper', {
        hunterLoaderWrapper: loaderVariant === LoaderVariant.Hunter,
      })}
    >
      <div
        className={cx('loading', {
          hunterLoading: loaderVariant === LoaderVariant.Hunter,
        })}
      >
        <p>
          {children} <span className={cx('dot1')}>.</span>
          <span className={cx('dot2')}>.</span>
          <span className={cx('dot3')}>.</span>
        </p>
      </div>
    </div>
  )
}
