'use client'
import React, { PropsWithChildren } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'primary' | 'secondary'
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
  const buttonClassName =
    variant === 'primary' ? styles.buttonPrimary : styles.buttonSecondary

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
