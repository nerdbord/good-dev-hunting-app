'use client'

import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import styles from './AddJobChatLoader.module.scss'

interface AddJobChatLoaderProps {
  message?: string
}

export const AddJobChatLoader = ({ message }: AddJobChatLoaderProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [dots, setDots] = useState('.')
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showIcons, setShowIcons] = useState(false)

  // Messages about the job creation process
  const jobCreationMessages = [
    t('creatingJobMessage'),
    t('aiAnalyzingMessage'),
    t('matchingSpecialistsMessage'),
  ]

  // Animation for the dots
  useEffect(() => {
    const timer = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? '.' : prev + '.'))
    }, 500)

    return () => clearInterval(timer)
  }, [])

  // Cycle through messages
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % jobCreationMessages.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [jobCreationMessages])

  // Delay showing the tech icons for a smoother entry
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIcons(true)
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  // Use provided message or cycle through job creation messages
  const displayMessage = message || jobCreationMessages[currentMessageIndex]

  return (
    <div className={styles.loaderContainer}>
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
              fill="var(--bg-color2)"
              stroke="#a687ff"
              strokeWidth="1.6"
              className={styles.logoRect}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M34 6H32.4V12.4L25.2 12.4V6H23.6V9.89829C22.403 7.5828 19.9863 6.00005 17.2 6.00005C13.2235 6.00005 10 9.2236 10 13.2C10 17.1765 13.2235 20.4 17.2 20.4C19.8322 20.4 22.1345 18.9876 23.3903 16.8792C23.4638 16.7557 23.5338 16.6299 23.6 16.5018V20.4H25.2V14L32.4 14V20.4H34V6ZM17.2 7.60005C20.0212 7.60005 22.3551 9.68619 22.7433 12.4H18V14H22.7433C22.6403 14.7199 22.4004 15.3957 22.0508 16C21.0826 17.6739 19.2728 18.8 17.2 18.8C14.1072 18.8 11.6 16.2928 11.6 13.2C11.6 10.1073 14.1072 7.60005 17.2 7.60005Z"
              fill="#a687ff"
              className={styles.logoPath}
            />
            <path d="M18 12.4V6H23.6V12.4H18Z" fill="var(--bg-color2)" />
          </svg>
        </div>

        <div className={styles.messageContainer}>
          <h2 className={styles.message} key={currentMessageIndex}>
            {displayMessage}
            <span className={styles.dots}>{dots}</span>
          </h2>
          <p className={styles.subtitle}>{t('specialistsCount')}</p>
        </div>

        {showIcons && (
          <div className={styles.techIconsContainer}>
            <div className={styles.codeBox}>
              <div className={styles.line1}></div>
              <div className={styles.line2}></div>
              <div className={styles.line3}></div>
              <div className={styles.cursor}></div>
            </div>
            <div className={styles.aiAnalyzerCircle}>
              <div className={styles.pulseRing}></div>
              <div className={styles.innerCircle}></div>
            </div>
            <div className={styles.connectingDotsContainer}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
