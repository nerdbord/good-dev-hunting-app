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
import { ProfileModel } from '@/data/frontend/profile/types'

interface PersonalInfoProps {
  profile: ProfileModel | null
}
const PersonalInfo = ({ profile }: PersonalInfoProps) => {
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
        <InputFormError error={errors.fullName} touched={touched.fullName}>
          {touched.fullName && <span>huj</span>}
          <TextInput
            onBlur={handleBlur}
            label="Full name"
            placeholder="eg. Anna Oxford"
            value={values.fullName}
            onChange={handleChange}
            name="fullName"
            dataTestId="fullName"
          />
        </InputFormError>
        <div className={styles.emailContainer}>
          <InputFormError error={errors.contactEmail}>
            <TextInput
              onBlur={handleBlur}
              label="Contact email"
              placeholder={session?.user?.email || ''}
              value={values.contactEmail}
              onChange={handleChange}
              addImportantIcon={true}
              name="contactEmail"
              disabled={true}
              tooltipText=" Email is connected to your Github profile and cannot be changed!"
              dataTestId=""
            />
          </InputFormError>
        </div>
        <UserPhotoUploader profile={profile} />
        <TextInput
          label="LinkedIn"
          placeholder="Paste link to you linkedin profile"
          value={values.linkedin}
          onChange={handleChange}
          name="linkedin"
          dataTestId="linkedin"
        />
        {touched && (
          <InputFormError error={errors.bio} touched={touched.bio}>
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
        )}
      </div>
    </div>
  )
}

export default PersonalInfo
