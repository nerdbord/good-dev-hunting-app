'use client'
import React from 'react'
import styles from './PersonalInfo.module.scss'
import TextInput from '@/inputs/TextInput/TextInput'
import TextArea from '@/inputs/TextArea/TextArea'
import { useFormContext } from '@/contexts/FormContext'

const PersonalInfo = () => {
  const { values, handleChange, errors } = useFormContext()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.
        </div>
      </div>
      <div className={styles.right}>
        <div className={errors.fullName ? styles.errorMsg : ''}>
          <TextInput
            label="Full name"
            placeholder="eg. Anna Oxford"
            value={values.fullName}
            onChange={handleChange}
            name="fullName"
          />
          <p>{errors.fullName as string}</p>
        </div>
        <div className={errors.contactEmail ? styles.errorMsg : ''}>
          <TextInput
            label=" Contact email"
            placeholder=" Contact email"
            value={values.contactEmail}
            onChange={handleChange}
            addImportantIcon={true}
            name="contactEmail"
          />
          <p>{errors.contactEmail as string}</p>
        </div>
        <TextInput
          label="LinkedIn"
          placeholder="Paste link to you linkedin profile"
          value={values.linkedin}
          onChange={handleChange}
          name="linkedin"
        />
        <div className={errors.bio ? styles.errorMsg : ''}>
          <TextArea
            label="Bio"
            placeholder="Introduce yourself with few sentences"
            value={values.bio}
            addImportantIcon={true}
            onChange={handleChange}
            name="bio"
          />
          <p>{errors.bio as string}</p>
        </div>
        <div className={styles.lettersCount}>
          {values.bio.length} / 1500 characters
        </div>
      </div>
    </div>
  )
}

export default PersonalInfo