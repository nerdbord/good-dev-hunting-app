'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React, { useEffect } from 'react'
import { ThemeIcon } from './ThemeIcon'
import styles from './ThemeSwitcher.module.scss'

type SwitchProps = {
  className?: string
  containerClassName?: string
}

export const ThemeSwitcher: React.FC<SwitchProps> = ({
  className,
  containerClassName,
}) => {
  const { isDarkTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkTheme])

  return (
    <div className={`${styles['mode-slide-tab']}`}>
      <button
        onClick={toggleTheme}
        className={`${styles.switch} ${
          isDarkTheme ? styles.dark : styles.light
        } ${className || ''}`}
        aria-label={
          isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        <ThemeIcon isDarkTheme={isDarkTheme} className={styles.icon} />
      </button>
    </div>
  )
}
