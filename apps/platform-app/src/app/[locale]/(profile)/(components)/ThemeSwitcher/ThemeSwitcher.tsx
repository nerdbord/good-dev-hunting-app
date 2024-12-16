'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React, { useEffect, useState } from 'react'
import { ThemeIcon } from './ThemeIcon'
import styles from './ThemeSwitcher.module.scss'

type SwitchProps = {
  className?: string
}

export const ThemeSwitcher: React.FC<SwitchProps> = ({ className }) => {
  const { isDarkTheme, toggleTheme } = useThemeStore()
  const [isSliderHidden, setIsSliderHidden] = useState(false)

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkTheme])

  const handleToggleTheme = () => {
    // Ukryj slider
    setIsSliderHidden(true)

    // Po 300ms przełącz motyw
    setTimeout(() => {
      toggleTheme()

      // Przywróć slider po zmianie motywu
      setIsSliderHidden(false)
    }, 300)
  }

  return (
    <>
      <button
        onClick={handleToggleTheme}
        className={styles.switch}
        aria-label={
          isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        <div
          className={`${styles.slider} ${isDarkTheme ? styles.sliderDark : ''}`}
        />
        <ThemeIcon isDarkTheme={isDarkTheme} className={styles.icon} />
      </button>
    </>
  )
}
