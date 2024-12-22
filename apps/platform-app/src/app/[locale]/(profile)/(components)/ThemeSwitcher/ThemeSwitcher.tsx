'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React, { useEffect, useState } from 'react'
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
  const [isSliderHidden, setIsSliderHidden] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      console.log('Scroll position:', scrollPosition) // debugging
      setIsScrolled(scrollPosition > 50)
      console.log('Is scrolled:', scrollPosition > 50) // debugging
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    console.log('isScrolled changed to:', isScrolled)
  }, [isScrolled])

  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
    }
  }, [isDarkTheme])

  const handleToggleTheme = () => {
    setIsSliderHidden(true)
    setTimeout(() => {
      toggleTheme()
      setIsSliderHidden(false)
    }, 300)
  }

  return (
    <div
      className={`mode-slide-tab ${isScrolled ? 'scrolled' : ''}`}
      onClick={() => {
        console.log('Current classes:', {
          modeSlideTab: styles.modeSlideTab,
          scrolled: styles.scrolled,
          isScrolled,
        })
      }}
    >
      <button
        onClick={handleToggleTheme}
        className={`${styles.switch} ${className || ''}`}
        aria-label={
          isDarkTheme ? 'Switch to light mode' : 'Switch to dark mode'
        }
      >
        <div
          className={`${styles.slider} ${isDarkTheme ? styles.sliderDark : ''}`}
        />
        <ThemeIcon isDarkTheme={isDarkTheme} className={styles.icon} />
      </button>
    </div>
  )
}
