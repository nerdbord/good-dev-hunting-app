'use client'
import React from 'react'
import styles from './CreateProfileButton.module.scss'

const CreateProfileButton = () => {
  const saveProfile = () => {
    console.log('saved!')
  }

  return (
    <button className={styles.saveProfileBtn} onClick={saveProfile}>
      Save and preview profile{' '}
    </button>
  )
}

export default CreateProfileButton
