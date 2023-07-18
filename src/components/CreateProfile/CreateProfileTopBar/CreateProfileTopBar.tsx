'use client'
import React from 'react'
import styles from './CreateProfileTopBar.module.scss'
import { Button } from '@/inputs/Button/Button'

const ProfileTopBar = () => {
  const handleButtonClick = () => {
    console.log('clicked')
  }
  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Create profile page</span>
      <Button variant={'primary'} onClick={handleButtonClick}>
        {' '}
        Save and preview profile{' '}
      </Button>
    </div>
  )
}

export default ProfileTopBar
