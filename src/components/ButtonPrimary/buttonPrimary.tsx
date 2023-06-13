import React, { PropsWithChildren } from 'react'
import styles from './buttonPrimary.module.scss'

interface ButtonPrimaryProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonPrimary = ({
  onClick,
  children,
}: PropsWithChildren<ButtonPrimaryProps>) => {
  return (
    <button className={styles.buttonPrimary} onClick={onClick}>
      {children}
    </button>
  )
}
