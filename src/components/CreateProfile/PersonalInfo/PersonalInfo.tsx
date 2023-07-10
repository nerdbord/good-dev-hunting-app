'use client'
import React, { useState } from 'react'
import styles from './PersonalInfo.module.scss'
import TextInput from '@/inputs/TextInput/TextInput'
import TextArea from '@/inputs/TextArea/TextArea'

const PersonalInfo = () => {
  const [fullName, setFullName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [bio, setBio] = useState('')

  const handleFullNameChange = (value: string) => {
    setFullName(value)
  }

  const handleContactEmailChange = (value: string) => {
    setContactEmail(value)
  }

  const handleLinkedinChange = (value: string) => {
    setLinkedin(value)
  }

  const handleBioChange = (value: string) => {
    if (value.length <= 1500) {
      setBio(value)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Work information</div>
        <div className={styles.personalInfo}>
          Share your residency information and preferred work place.{' '}
        </div>
      </div>
      <div className={styles.right}>
        <TextInput
          label="Full name"
          placeholder="eg. Anna Oxford"
          value={fullName}
          onChange={handleFullNameChange}
        />

        <TextInput
          label=" Contact email"
          placeholder=" Contact email"
          value={contactEmail}
          onChange={handleContactEmailChange}
          addImportantIcon={true}
        />

        <TextInput
          label="LinkedIn"
          placeholder="Paste link to you linkedin profile"
          value={linkedin}
          onChange={handleLinkedinChange}
        />

        <TextArea
          label="Bio"
          placeholder="Introduce yourself with few senteses"
          value={bio}
          addImportantIcon={true}
          onChange={handleBioChange}
        />

        <div className={styles.lettersCount}>
          {bio.length} / 1500 characters
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo
