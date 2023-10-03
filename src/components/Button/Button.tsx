'use client'
import React, { PropsWithChildren, useMemo } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit'
  disabled?: boolean
  loading?: boolean
}

export const Button = ({
  onClick,
  children,
  variant,
  disabled,
  loading,
}: PropsWithChildren<ButtonProps>) => {
  const buttonClassName = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary
      case 'secondary':
        return styles.buttonSecondary
      case 'tertiary':
        return styles.buttonTertiary
      default:
        return styles.buttonPrimary
    }
  }, [variant])

  const disabledClass = disabled || loading ? styles.disabled : ''

  return (
    <button
      className={[buttonClassName, disabledClass].join(' ')}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? 'Loading...' : children}
    </button>
  )
}
