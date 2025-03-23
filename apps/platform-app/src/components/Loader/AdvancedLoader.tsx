'use client'

import { useThemeStore } from '@/hooks/useThemeStore'
import React, { useEffect, useState } from 'react'
import styles from './AdvancedLoader.module.scss'

interface AdvancedLoaderProps {
  message?: string
}

const AdvancedLoader: React.FC<AdvancedLoaderProps> = ({
  message = 'Loading',
}) => {
  const { isDarkTheme } = useThemeStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const initialDelay = setTimeout(() => {
      // Start at 10% after a small delay
      setProgress(10)
    }, 300)

    // Simulate incremental progress
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval)
          return prevProgress
        }

        // More realistic increments that slow down as they approach 90%
        const increment = Math.max(1, Math.floor((90 - prevProgress) / 10))
        return prevProgress + increment
      })
    }, 600)

    return () => {
      clearTimeout(initialDelay)
      clearInterval(interval)
    }
  }, [])

  return (
    <div
      className={`${styles.loaderContainer} ${
        isDarkTheme ? styles.darkTheme : styles.lightTheme
      }`}
    >
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <div className={styles.logoInner}>
              <span className={styles.logoText}>GDH</span>
            </div>
          </div>
        </div>

        <div className={styles.loadingBar}>
          <div
            className={styles.loadingProgress}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.loadingText}>
          {message}
          <span className={styles.dots}>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
            <span className={styles.dot}></span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default AdvancedLoader
