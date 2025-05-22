'use client'

import React, { useEffect, useState } from 'react'
import { LogoLight } from '../hunter-landing/UI/LogoLight/LogoLight'
import styles from './HunterLoader.module.scss'

interface HunterLoaderProps {
  message?: string
}

const HunterLoader: React.FC<HunterLoaderProps> = ({ message = 'Loading' }) => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setProgress(10)
    }, 300)

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 90) {
          clearInterval(interval)
          return prevProgress
        }

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
    <div className={styles.loaderContainer}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <LogoLight />
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

export default HunterLoader
