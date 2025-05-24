'use client'

import { Roles } from '@/app/[locale]/(auth)/_models/User.model'
import { type LoginFormValues } from '@/app/[locale]/(jobs)/_utils/types'
import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import * as Yup from 'yup'
import { getPendingPublishJob } from '../../_utils/job-storage.client'
import { EmailSentConfirmation } from './EmailSentConfirmation'
import styles from './LoginModal.module.scss'

export const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const t = useTranslations(I18nNamespaces.Auth)
  const [emailSent, setEmailSent] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState('')

  const pendingJobId = getPendingPublishJob()
  const finalDestinationUrl = pendingJobId
    ? `${AppRoutes.jobs}/${pendingJobId}?publish=true`
    : AppRoutes.home

  const encodedFinalDestination = encodeURIComponent(finalDestinationUrl)
  const intermediateCallbackUrl = `${AppRoutes.oAuth}?role=${Roles.HUNTER}&redirectTo=${encodedFinalDestination}`

  const handleSigninByLinkedIn = () => {
    signIn('linkedin', {
      callbackUrl: intermediateCallbackUrl,
    })
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
    // Store the email for the confirmation screen
    setSubmittedEmail(values.email)
    
    // Call signIn but don't redirect (set redirect: false)
    signIn('email', {
      email: values.email,
      callbackUrl: intermediateCallbackUrl,
      redirect: false,
    })
    
    // Show confirmation instead of closing modal
    setEmailSent(true)
  }

  // If email has been sent, show confirmation screen
  if (emailSent) {
    return <EmailSentConfirmation email={submittedEmail} />
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
