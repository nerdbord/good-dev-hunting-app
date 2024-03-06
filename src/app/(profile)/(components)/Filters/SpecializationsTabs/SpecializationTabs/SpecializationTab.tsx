'use client'
import classNames from 'classnames/bind'
import { type PropsWithChildren } from 'react'
import styles from './SpecializationTab.module.scss'

const cx = classNames.bind(styles)

interface SpecializationTabProps {
  count?: number
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
  isPressed: boolean
  color: string
}

export const SpecializationTab = ({
  children,
  count,
  onClick,
  color,
  isPressed,
}: PropsWithChildren<SpecializationTabProps>) => {
  const buttonStyle = isPressed ? { borderColor: color, color: color } : {}
  const getSpecializationTabClasses = cx({
    [styles.default]: true,
  })

  return (
    <div
      className={getSpecializationTabClasses}
      onClick={onClick}
      style={buttonStyle}
    >
      <div className={styles.content}>
        <span>{children}</span>
        <p>{count !== undefined ? `(${count})` : ''}</p>
      </div>
    </div>
  )
}
