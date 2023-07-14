'use client'
import React from 'react'
import styles from './ProfileTopBar.module.scss'
import { Button } from '@/inputs/Button/Button'

const ProfileTopBar = () => {
  const handleButtonClick = () => {
    console.log('clicked')
  }
  return (
    <div className={styles.titleBox}>
      <span>Profile preview</span>
      <div className={styles.buttonBox}>
        <Button variant={'secondary'} onClick={handleButtonClick}>
          {' '}
          Edit{' '}
        </Button>
        <Button variant={'primary'} onClick={handleButtonClick}>
          {' '}
          Publish profile{' '}
        </Button>
      </div>
    </div>
  )
}

export default ProfileTopBar
