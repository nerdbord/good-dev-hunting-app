'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React, { useEffect } from 'react'
import styles from './ThemeSwitcher.module.scss'

type SwitchProps = {
  className?: string
}

export const ThemeSwitcher: React.FC<SwitchProps> = ({ className }) => {
  const { isDarkTheme, toggleTheme } = useThemeStore()

  // Dodaj efekt, który będzie zmieniał klasę na <html>
  useEffect(() => {
    // Dodaj lub usuń klasę 'light' na elemencie <html>
    if (isDarkTheme) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkTheme])

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
