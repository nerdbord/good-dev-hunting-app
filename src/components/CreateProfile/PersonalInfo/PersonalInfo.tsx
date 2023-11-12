'use client'
import React from 'react'
import styles from './PersonalInfo.module.scss'
import TextInput from '@/components/TextInput/TextInput'
import TextArea from '@/components/TextArea/TextArea'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/CreateProfileForm/InputErrorWrapper'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { useSession } from 'next-auth/react'

const PersonalInfo = () => {
  const { values, handleChange, errors } =
    useFormikContext<CreateProfileFormValues>()

  const { data: session } = useSession()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.
        </div>
      </div>
      <div className={styles.right}>
        <InputFormError error={errors.fullName}>
          <TextInput
            label="Full name"
            placeholder="eg. Anna Oxford"
            value={values.fullName}
            onChange={handleChange}
            name="fullName"
          />
        </InputFormError>
        <div className={styles.emailContainer}>
          <InputFormError error={errors.contactEmail}>
            <TextInput
              label="Contact email"
              placeholder={session?.user?.email || ''}
              value={values.contactEmail}
              onChange={handleChange}
              addImportantIcon={true}
              name="contactEmail"
              disabled={true}
            />
          </InputFormError>
          <div className={styles.tooltip}>
            Email is connected to your Github profile and cannot be changed
          </div>
        </div>
        <TextInput
          label="LinkedIn"
          placeholder="Paste link to you linkedin profile"
          value={values.linkedin}
          onChange={handleChange}
          name="linkedin"
        />
        <InputFormError error={errors.bio}>
          <div className={styles.lettersCountParent}>
            <TextArea
              label="Bio"
              placeholder="Introduce yourself with few sentences"
              value={values.bio}
              addImportantIcon={true}
              onChange={handleChange}
              name="bio"
              maxLength={1500}
            />{' '}
            <div className={styles.lettersCount}>
              {values.bio.length} / 1500 characters
            </div>
          </div>
        </InputFormError>
      </div>
    </div>
  )
}

export default PersonalInfo
