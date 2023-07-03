'use client'
import React from 'react'
import styles from './CreateProfileTextarea.module.scss'

const CreateProfileTextArea = ({ placeholder }) => {
  return (
    <textarea
      className={styles.formTextarea}
      type="text"
      placeholder={placeholder}
    />
  )
}

export default CreateProfileTextArea
