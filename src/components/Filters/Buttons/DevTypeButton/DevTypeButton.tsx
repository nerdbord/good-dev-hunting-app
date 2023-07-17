import React, { PropsWithChildren } from 'react'
import styles from './DevTypeButton.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface DevTypeButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'frontend' | 'backend' | 'fullstack'
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
