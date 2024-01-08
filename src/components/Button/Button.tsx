'use client'
import React, { PropsWithChildren, useMemo } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'primary' | 'secondary' | 'tertiary' | 'action' | 'logout'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
  dataTestId?: string
}

export const Button = ({
  onClick,
  children,
  variant,
  disabled,
  loading,
  dataTestId,
  type,
}: PropsWithChildren<ButtonProps>) => {
  const buttonClassName = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary
      case 'secondary':
        return styles.buttonSecondary
      case 'tertiary':
        return styles.buttonTertiary
      case 'action':
        return styles.buttonAction
      case 'logout':
        return styles.buttonLogOut
      default:
        return styles.buttonPrimary
    }
  }, [variant])

  const disabledClass = disabled || loading ? styles.disabled : ''

  return (
    <button
      data-testid={dataTestId}
      className={[buttonClassName, disabledClass].join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
