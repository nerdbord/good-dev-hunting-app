import React, { useState } from 'react'
import styles from './ThemeIcon.module.scss'

type ThemeIconProps = {
  isDarkTheme: boolean
  className?: string
}

export const ThemeIcon: React.FC<ThemeIconProps> = ({
  isDarkTheme,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`${styles.icon} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isDarkTheme ? (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['theme-icon']}
        >
          {isHovered && (
            <rect
              x="32"
              y="32"
              width="32"
              height="32"
              rx="16"
              transform="rotate(-180 32 32)"
              fill="#171B21"
            />
          )}
          <path
            d="M16 10.0002C12.6863 10.0002 10 12.6864 10 16.0002C10 19.3139 12.6863 22.0002 16 22.0002C19.3137 22.0002 22 19.3139 22 16.0002C22 12.6864 19.3137 10.0002 16 10.0002Z"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0039 28L16.0039 25.8186"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.0039 6.18155L16.0039 4.00015"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.4844 24.4891L22.9356 22.9403"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.0625 9.06436L7.5137 7.51557"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 16.0038L25.8186 16.0038"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.17969 16.0038L3.99829 16.0038"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.4844 7.51557L22.9356 9.06436"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.0625 22.9403L7.5137 24.4891"
            stroke="#3D434B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles['theme-icon']}
        >
          {isHovered && (
            <rect
              x="32"
              y="32"
              width="32"
              height="32"
              rx="16"
              transform="rotate(-180 32 32)"
              fill="#F0F0FF"
            />
          )}
          <path
            d="M26 16.9009C25.8248 18.7963 25.1135 20.6025 23.9493 22.1084C22.785 23.6142 21.216 24.7573 19.4257 25.404C17.6355 26.0506 15.6981 26.174 13.8403 25.7598C11.9825 25.3455 10.2811 24.4108 8.93516 23.0648C7.58923 21.7189 6.65445 20.0175 6.2402 18.1597C5.82595 16.3019 5.94937 14.3645 6.59602 12.5743C7.24266 10.784 8.38578 9.215 9.89162 8.05074C11.3975 6.88648 13.2037 6.17515 15.0991 6C13.9894 7.50126 13.4554 9.35094 13.5943 11.2126C13.7331 13.0743 14.5355 14.8243 15.8556 16.1444C17.1757 17.4645 18.9257 18.2669 20.7874 18.4057C22.6491 18.5446 24.4987 18.0106 26 16.9009Z"
            stroke="#AEAED3"
            strokeWidth="1.74282"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  )
}
