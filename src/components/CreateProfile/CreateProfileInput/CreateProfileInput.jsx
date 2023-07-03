'use client'
import React from 'react'
import styles from './CreateProfileInput.module.scss'

const CreateProfileInput = ({ placeholder }) => {
  return (
    <input className={styles.formInput} type="text" placeholder={placeholder} />
  )
}

export default CreateProfileInput
