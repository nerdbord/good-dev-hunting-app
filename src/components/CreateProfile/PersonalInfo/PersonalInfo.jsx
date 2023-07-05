'use client'
import React from 'react'
import styles from './PersonalInfo.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import TextInput from '@/inputs/TextInput/TextInput'
import TextArea from '@/inputs/TextArea/TextArea'

const PersonalInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal Information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.{' '}
        </div>
      </div>
      <div className={styles.right}>
        <TextInput label="Full name" placeholder="eg. Anna Oxford" />

        <TextInput
          label=" Contact email"
          placeholder=" Contact email"
          addImportantIcon="true"
        />

        <TextInput
          label="LinkedIn"
          placeholder="Paste link to you linkedin profile"
        />

        <TextArea
          label="Bio"
          placeholder="Introduce yourself with few senteses"
          addImportantIcon="true"
        />

        <div className={styles.lettersCount}>0 / 1500 characters</div>
      </div>
    </div>
  )
}

export default PersonalInfo
