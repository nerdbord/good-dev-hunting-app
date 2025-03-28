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
          <svg
            className={styles.logo}
            width="80"
            height="50"
            viewBox="0 0 44 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.8"
              y="0.8"
              width="42.4"
              height="24.4"
              rx="12.2"
              fill="var(--bg-color)"
              stroke="var(--color)"
              strokeWidth="1.6"
              className={styles.logoRect}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34 6H32.4V12.4L25.2 12.4V6H23.6V9.89829C22.403 7.5828 19.9863 6.00005 17.2 6.00005C13.2235 6.00005 10 9.2236 10 13.2C10 17.1765 13.2235 20.4 17.2 20.4C19.8322 20.4 22.1345 18.9876 23.3903 16.8792C23.4638 16.7557 23.5338 16.6299 23.6 16.5018V20.4H25.2V14L32.4 14V20.4H34V6ZM17.2 7.60005C20.0212 7.60005 22.3551 9.68619 22.7433 12.4H18V14H22.7433C22.6403 14.7199 22.4004 15.3957 22.0508 16C21.0826 17.6739 19.2728 18.8 17.2 18.8C14.1072 18.8 11.6 16.2928 11.6 13.2C11.6 10.1073 14.1072 7.60005 17.2 7.60005Z"
              fill="var(--color)"
              className={styles.logoPath}
            />
            <path d="M18 12.4V6H23.6V12.4H18Z" fill="var(--bg-color)" />
          </svg>
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
