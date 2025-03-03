'use client'
import { AppRoutes } from '@/utils/routes'
import { Avatar } from '@gdh/ui-system'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import defaultUserImg from '../../../../../../public/default-avatar.png'
import styles from './GithubAcc.module.scss'

const GithubAcc = () => {
  const { data: session } = useSession()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const t = useTranslations('Inbox')

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  if (!session) {
    return (
      <div className={styles.github}>
        <div className={styles.githubAcc}>
          <Avatar src={defaultUserImg} size={38} />
          <p className={styles.githubAccName}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.github} ref={dropdownRef}>
      <div className={styles.githubAcc} onClick={toggleDropdown}>
        {session?.user.avatarUrl && (
          <Avatar src={session.user.avatarUrl} size={38} />
        )}
        <p className={styles.githubAccName}>{session?.user.name}</p>
        <span className={`${styles.dropdownArrow} ${isDropdownOpen ? styles.open : ''}`}>▼</span>
      </div>

      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <Link href={AppRoutes.myProfile} className={styles.dropdownItem}>
            My Profile
          </Link>
          <Link href={AppRoutes.inbox} className={styles.dropdownItem}>
            {t('title')}
          </Link>
        </div>
      )}
    </div>
  )
}

export default GithubAcc
