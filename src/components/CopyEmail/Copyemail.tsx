'use client'
import React from 'react'
import EmailIcon from '@/assets/icons/EmailIcon'
import styles from './Copyemail.module.scss'

interface CopyEmailProps {
  email: string
}
export const CopyEmail = ({ email }: CopyEmailProps) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
  }

  return (
    <div>
      <div className={styles.wrapper} onClick={handleCopyEmail}>
        Copy email
        <EmailIcon />
      </div>
    </div>
  )
}

export default CopyEmail
