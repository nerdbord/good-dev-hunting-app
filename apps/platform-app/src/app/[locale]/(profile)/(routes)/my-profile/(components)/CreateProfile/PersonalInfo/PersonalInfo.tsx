'use client'
import { UserPhotoUploader } from '@/app/[locale]/(profile)/(components)/UserPhotoUploader/UserPhotoUploader'
import { type CreateProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import InputFormError from '@/components/InputFormError/InputFormError'
import BioTextArea from '@/components/TextArea/BioTextArea'
import TextInput from '@/components/TextInput/TextInput'
import Tooltip from '@/components/Tooltip/Tooltip'
import { I18nNamespaces } from '@/i18n'
import { useFormikContext } from 'formik'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import styles from './PersonalInfo.module.scss'

export enum PersonalInfoFormKeys {
  FULL_NAME = 'fullName',
  CONTACT_EMAIL = 'contactEmail',
  LINKEDIN = 'linkedin',
  BIO = 'bio',
}

const PersonalInfo = () => {
  const t = useTranslations(I18nNamespaces.PersonalInfo)
  const { values, handleChange, errors, touched, handleBlur } =
    useFormikContext<CreateProfileFormValues>()

  const { data: session } = useSession()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{t('title')}</div>
        <div className={styles.personalInfo}>{t('description')} </div>
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
            label={t('name')}
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
            label={t('email')}
            value={session?.user?.email || ''}
            onChange={handleChange}
            addImportantIcon={true}
            name={PersonalInfoFormKeys.CONTACT_EMAIL}
            disabled={true}
            tooltipText={t('emailTooltip')}
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
            placeholder={t('linkedin')}
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
              <Tooltip text={t('bio')}>
                <ImportantIcon />
              </Tooltip>
            </label>
            <div className={styles.lettersCountParent}>
              <BioTextArea
                onBlur={handleBlur}
                placeholder={t('bioPlaceholder')}
                value={values[PersonalInfoFormKeys.BIO]}
                onChange={handleChange}
                name={PersonalInfoFormKeys.BIO}
                maxLength={1500}
                dataTestId={PersonalInfoFormKeys.BIO}
              />
              <div className={styles.lettersCount}>
                {values[PersonalInfoFormKeys.BIO].length} / 1500{' '}
                {t('characters')}
              </div>
            </div>
          </InputFormError>
        </div>
      </div>
    </div>
  )
}
export default PersonalInfo
