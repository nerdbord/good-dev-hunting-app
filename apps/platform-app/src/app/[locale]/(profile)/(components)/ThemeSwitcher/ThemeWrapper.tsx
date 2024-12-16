'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import type { ReactNode } from 'react'
import React from 'react'
import styles from './ThemeSwitcher.module.scss'

interface ThemeWrapperProps {
  children: ReactNode
}

export const ThemeWrapper: React.FC<ThemeWrapperProps> = ({ children }) => {
  const { isDarkTheme } = useThemeStore()

  console.log('Current theme:', isDarkTheme ? 'dark' : 'light')

  return (
    <div
      className={`${styles.theme} ${isDarkTheme ? styles.light : styles.dark}`}
    >
      {children}
    </div>
  )
}
