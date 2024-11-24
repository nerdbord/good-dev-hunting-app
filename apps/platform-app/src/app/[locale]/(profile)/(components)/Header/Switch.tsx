'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React from 'react'
import styles from './Header.module.scss'

type SwitchProps = {
  className?: string
}

export const Switch: React.FC<SwitchProps> = ({ className }) => {
  const { isDarkTheme, toggleTheme } = useThemeStore()

  return (
    <>
      <button
        onClick={toggleTheme}
        className={styles.switch}
        aria-label={
          isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        <div
          className={`${styles.slider} ${isDarkTheme ? styles.sliderDark : ''}`}
        />
      </button>
    </>
  )
}
