'use client'
import React, { PropsWithChildren, useMemo } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant: 'primary' | 'secondary' | 'tertiary'
  type?: 'button' | 'submit'
}

export const Button = ({
  onClick,
  children,
  variant,
}: PropsWithChildren<ButtonProps>) => {
  const buttonClassName = useMemo(() => {
    switch (variant) {
      case 'primary':
        return styles.buttonPrimary;
      case 'secondary':
        return styles.buttonSecondary;
      case 'tertiary':
        return styles.buttonTertiary;
      default:
        return styles.buttonPrimary;
    }
  }, [variant]);

  return (
    <button className={buttonClassName} onClick={onClick}>
      {children}
    </button>
  )
}
