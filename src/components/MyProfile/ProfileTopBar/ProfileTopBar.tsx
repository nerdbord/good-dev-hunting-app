'use client'
import React from 'react'
import styles from './ProfileTopBar.module.scss'
import EditProfileBtn from '@/components/EditProfileBtn/EditProfileBtn'
import PublishProfileBtn from '@/components/PublishProfileBtn/PublishProfileBtn'

const ProfileTopBar = () => {
  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        <EditProfileBtn />
        <PublishProfileBtn />
      </div>
    </div>
  )
}

export default ProfileTopBar
