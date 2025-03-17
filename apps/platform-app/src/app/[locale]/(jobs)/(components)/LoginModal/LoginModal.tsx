'use client'

import { type LoginFormValues } from '@/app/[locale]/(jobs)/_utils/types'
import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import * as Yup from 'yup'
import { getPendingPublishJob } from '../../_utils/jobStorage'
import styles from './LoginModal.module.scss'

export const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const t = useTranslations(I18nNamespaces.Auth)
  const router = useRouter()

  // Check if there's a pending job to publish
  const pendingJobId = getPendingPublishJob()
  const callbackUrl = pendingJobId
    ? `${AppRoutes.jobs}/${pendingJobId}?publish=true`
    : AppRoutes.profilesList

  const handleSigninByLinkedIn = () => {
    signIn('linkedin', {
      callbackUrl,
    })
  }

  const handleSignup = () => {
    // For now, just close the modal as the user will be redirected
    // to the sign-up flow as part of the sign-in process
    closeModal()
    router.push(AppRoutes.signIn)
  }

  const initialValues: LoginFormValues = {
    email: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        'Please enter a valid email address with a domain (e.g., .com, .pl)',
      ),
  })

  const handleSubmit = (values: LoginFormValues) => {
    // Use Next Auth's email provider to send a magic link
    signIn('email', {
      email: values.email,
      callbackUrl,
    })
    closeModal()
  }

  return (
    <div
      className={styles.container}
      data-testid="loginToPublishJobPopup"
      onClick={(e) => e.stopPropagation()}
    >
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>{t('loginToPublish')}</h2>
        <p className={styles.description}>{t('loginToPublishDesc')}</p>
      </div>
      <div className={styles.actions}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <InputFormError error={touched.email && errors.email}>
                <TextInput
                  label={t('loginLabelEmail')}
                  onBlur={handleBlur}
                  value={values.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="m@example.com"
                  dataTestId="loginEmail"
                  maxLength={320}
                />
              </InputFormError>
              <Button type="submit" variant="primary">
                {t('loginLabelButton')}
              </Button>
            </form>
          )}
        </Formik>
        <p className={styles.or}>{t('or')}</p>
        <Button
          variant="secondary"
          type="button"
          onClick={handleSigninByLinkedIn}
        >
          {t('signInWithLinkedin')}
        </Button>
      </div>
    </div>
  )
}
