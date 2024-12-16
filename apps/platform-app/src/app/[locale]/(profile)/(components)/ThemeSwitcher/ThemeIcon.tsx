import React from 'react'
import styles from './ThemeIcon.module.scss'

type ThemeIconProps = {
  isDarkTheme: boolean
  className?: string
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  isDarkTheme,
  className,
}) => {
  return (
    <div className={`${styles.icon} ${className}`}>
      {/* Moon icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill={isDarkTheme ? '#A687FF' : 'none'}
        stroke={isDarkTheme ? '#A687FF' : '#E4E4F6'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles['icon-moon']}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      </svg>

      {/* Sun icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill={isDarkTheme ? '#3D434B' : '#A687FF'}
        stroke={isDarkTheme ? '#3D434B' : '#A687FF'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={styles['icon-sun']}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </div>
  )
}
