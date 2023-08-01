'use client'
import React, { PropsWithChildren } from 'react'
import styles from './GoBackButton.module.scss'

export const GoBackButton = ({ children }: PropsWithChildren<object>) => {
  const handleClick = () => {
    console.log('Clicked')
  }

  return (
    <div>
      <button className={styles.back} onClick={handleClick}>
        {children}
      </button>
    </div>
  )
}

export default GoBackButton
