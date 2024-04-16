'use client'
import { UserPhotoUploader } from '@/app/(profile)/(components)/UserPhotoUploader/UserPhotoUploader'
import { type CreateProfileFormValues } from '@/app/(profile)/profile.types'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import InputFormError from '@/components/InputFormError/InputFormError'
import BioTextArea from '@/components/TextArea/BioTextArea'
import TextInput from '@/components/TextInput/TextInput'
import Tooltip from '@/components/Tooltip/Tooltip'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import styles from './PersonalInfo.module.scss'

export enum PersonalInfoFormKeys {
  FULL_NAME = 'fullName',
  CONTACT_EMAIL = 'contactEmail',
  LINKEDIN = 'linkedin',
  BIO = 'bio',
}

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
        <InputFormError
          error={
            touched[PersonalInfoFormKeys.FULL_NAME] &&
            errors[PersonalInfoFormKeys.FULL_NAME]
          }
        >
          <TextInput
            onBlur={handleBlur}
            label="Full name"
            placeholder="eg. Anna Oxford"
            value={values[PersonalInfoFormKeys.FULL_NAME]}
            onChange={handleChange}
            name={PersonalInfoFormKeys.FULL_NAME}
            dataTestId={PersonalInfoFormKeys.FULL_NAME}
            maxLength={40}
          />
        </InputFormError>
        <div className={styles.emailContainer}>
          <TextInput
            label="Contact email"
            value={session?.user?.email || ''}
            onChange={handleChange}
            addImportantIcon={true}
            name={PersonalInfoFormKeys.CONTACT_EMAIL}
            disabled={true}
            tooltipText=" Email is connected to your Github profile and cannot be changed"
            dataTestId=""
            maxLength={30}
          />
        </div>
        <UserPhotoUploader />
        <InputFormError
          error={
            touched[PersonalInfoFormKeys.LINKEDIN] &&
            errors[PersonalInfoFormKeys.LINKEDIN]
          }
        >
          <TextInput
            onBlur={handleBlur}
            label="LinkedIn"
            placeholder="Paste link to you linkedin profile"
            value={values[PersonalInfoFormKeys.LINKEDIN] || ''}
            onChange={handleChange}
            name={PersonalInfoFormKeys.LINKEDIN}
            dataTestId={PersonalInfoFormKeys.LINKEDIN}
          />
        </InputFormError>
        <div>
          <InputFormError
            error={
              touched[PersonalInfoFormKeys.BIO] &&
              errors[PersonalInfoFormKeys.BIO]
            }
          >
            <label className={styles.formLabel}>
              {'Bio'}
              <Tooltip
                text={
                  'Let others know you - write a few sentences about yourself.'
                }
              >
                <ImportantIcon />
              </Tooltip>
            </label>
            <div className={styles.lettersCountParent}>
              <BioTextArea
                onBlur={handleBlur}
                placeholder="You can use **markdown** to format your text. [Links](https://devhunting.co) are also supported."
                value={values[PersonalInfoFormKeys.BIO]}
                onChange={handleChange}
                name={PersonalInfoFormKeys.BIO}
                maxLength={1500}
                dataTestId={PersonalInfoFormKeys.BIO}
              />
              <div className={styles.lettersCount}>
                {values[PersonalInfoFormKeys.BIO].length} / 1500 characters
              </div>
            </div>
          </InputFormError>
        </div>
      </div>
    </div>
  )
}
export default PersonalInfo
