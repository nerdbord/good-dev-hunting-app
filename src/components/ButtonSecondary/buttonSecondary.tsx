import React, { PropsWithChildren } from 'react'
import styles from './buttonSecondary.module.scss'

interface ButtonSecondaryProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonSecondary = ({
  onClick,
  children,
}: PropsWithChildren<ButtonSecondaryProps>) => {
  return (
    <button className={styles.buttonSecondary} onClick={onClick}>
      {children}
    </button>
  )
}
