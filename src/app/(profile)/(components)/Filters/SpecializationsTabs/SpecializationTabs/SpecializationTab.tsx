'use client'
import classNames from 'classnames/bind'
import React, { PropsWithChildren } from 'react'
import styles from './SpecializationTab.module.scss'

const cx = classNames.bind(styles)

interface SpecializationTabProps {
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  isPressed: boolean
  count?: number
  color: string
}

export const SpecializationTab = ({
  onClick,
  children,
  isPressed,
  count,
  color,
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
