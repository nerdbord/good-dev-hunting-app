'use client'
import React, { PropsWithChildren } from 'react'
import styles from './DevTypeButton.module.scss'
import classNames from 'classnames/bind'
import { JobSpecialization } from '@/components/ProfileList/profile-data'
const cx = classNames.bind(styles)

interface DevTypeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant:
    | JobSpecialization.Frontend
    | JobSpecialization.Backend
    | JobSpecialization.Fullstack
  isPressed: boolean
}

export const DevTypeButton = ({
  onClick,
  children,
  variant,
  isPressed,
}: PropsWithChildren<DevTypeButtonProps>) => {
  const getDevTypeButtonClasses = cx({
    [styles.default]: true,
    [variant]: true,
    [styles.pressed]: isPressed,
  })

  return (
    <button className={getDevTypeButtonClasses} onClick={onClick}>
      {children}
    </button>
  )
}
