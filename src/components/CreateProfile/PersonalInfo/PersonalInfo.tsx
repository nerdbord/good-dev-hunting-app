'use client'
import React from 'react'
import styles from './PersonalInfo.module.scss'
import TextInput from '@/components/TextInput/TextInput'
import TextArea from '@/components/TextArea/TextArea'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/InputFormError/InputFormError'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { useSession } from 'next-auth/react'
import { UserPhotoUploader } from '@/components/UserPhotoUploader/UserPhotoUploader'

const PersonalInfo = () => {
  const { values, handleChange, errors, touched, handleBlur } =
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
        <InputFormError error={touched.fullName && errors.fullName}>
          <TextInput
            onBlur={handleBlur}
            label="Full name"
            placeholder="eg. Anna Oxford"
            value={values.fullName}
            onChange={handleChange}
            name="fullName"
            dataTestId="fullName"
            maxLength={40}
          />
        </InputFormError>
        <div className={styles.emailContainer}>
          <TextInput
            label="Contact email"
            value={session?.user?.email || ''}
            onChange={handleChange}
            addImportantIcon={true}
            name="contactEmail"
            disabled={true}
            tooltipText=" Email is connected to your Github profile and cannot be changed!"
            dataTestId=""
            maxLength={30}
          />
        </div>
        <UserPhotoUploader />
        <InputFormError error={touched.linkedin && errors.linkedin}>
          <TextInput
            onBlur={handleBlur}
            label="LinkedIn"
            placeholder="Paste link to you linkedin profile"
            value={values.linkedin}
            onChange={handleChange}
            name="linkedin"
            dataTestId="linkedin"
          />
        </InputFormError>
        <InputFormError error={touched.bio && errors.bio}>
          <div className={styles.lettersCountParent}>
            <TextArea
              onBlur={handleBlur}
              label="Bio"
              placeholder="Introduce yourself with few sentences"
              value={values.bio}
              addImportantIcon={true}
              onChange={handleChange}
              name="bio"
              maxLength={1500}
              tooltipText="Let others know you - write a few sentences about yourself."
              dataTestId="bio"
            />
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
