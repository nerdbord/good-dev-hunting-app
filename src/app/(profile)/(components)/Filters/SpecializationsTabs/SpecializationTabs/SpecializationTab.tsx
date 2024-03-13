'use client'
import classNames from 'classnames/bind'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { type PropsWithChildren } from 'react'
import styles from './SpecializationTab.module.scss'

const cx = classNames.bind(styles)

interface SpecializationTabProps {
  count?: number
  color: string
  href: string
}

export const SpecializationTab = ({
  children,
  count,
  color,
  href,
}: PropsWithChildren<SpecializationTabProps>) => {
  const pathname = usePathname()
  const isActive = pathname === href.split('?')[0]

  const buttonStyle = isActive ? { borderColor: color, color: color } : {}
  const getSpecializationTabClasses = cx({
    [styles.default]: true,
  })

  return (
    <Link
      className={getSpecializationTabClasses}
      style={buttonStyle}
      href={href}
    >
      <div className={styles.content}>
        <span>{children}</span>
        <p>{count !== undefined ? `(${count})` : ''}</p>
      </div>
    </Link>
  )
}
