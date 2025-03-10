'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import { getServerCookie, setServerCookie } from '@/utils/cookiesHelper'
import type { ReactNode } from 'react'
import React, { useEffect } from 'react'
import styles from './ThemeSwitcher.module.scss'

interface ThemeWrapperProps {
  children: ReactNode
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { isDarkTheme, toggleTheme } = useThemeStore()

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await getServerCookie('theme')
      if (savedTheme) {
        if (savedTheme === 'light' && isDarkTheme) toggleTheme()
        if (savedTheme === 'dark' && !isDarkTheme) toggleTheme()
      }
    }
    fetchTheme()
  }, [])

  useEffect(() => {
    setServerCookie('theme', isDarkTheme ? 'dark' : 'light', 365)
  }, [isDarkTheme])

  return (
    <div className={`${styles.theme} ${!isDarkTheme ? 'light' : ''}`}>
      {children}
    </div>
  )
}
