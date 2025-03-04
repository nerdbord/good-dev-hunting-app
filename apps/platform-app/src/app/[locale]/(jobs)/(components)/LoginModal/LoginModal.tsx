'use client'

import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'
import { type LoginFormValues } from '../../types'
import styles from './LoginModal.module.scss'

export const LoginModal = ({ closeModal }: { closeModal: () => void }) => {
  const t = useTranslations(I18nNamespaces.Auth)

  const handleSigninByGoogle = () => {
    console.log('wybrales logowanie przez Google przycisk klikniety')
  }

  const handleSignup = () => {
    console.log('wybrales rejestracje przez przycisk tertiary button klikniety')
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
    console.log('wysyłanie linka do logowania', values)
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
          onClick={handleSigninByGoogle}
        >
          {t('signInWithGoogle')}
        </Button>
        <div className={styles.haventAccountContainer}>
          <span className={styles.haventAccount}>{t('haventAccount')}</span>
          <Button variant="tertiary" type="button" onClick={handleSignup}>
            {t('signUp')}
          </Button>
        </div>
      </div>
    </div>
  )
}
