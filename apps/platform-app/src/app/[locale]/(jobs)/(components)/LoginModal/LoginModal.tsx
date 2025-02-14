'use client'

import InputFormError from '@/components/InputFormError/InputFormError'
import TextInput from '@/components/TextInput/TextInput'
import { useModal } from '@/contexts/ModalContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import * as Yup from 'yup'
import { type LoginFormValues } from '../../types'
import styles from './LoginModal.module.scss'
// import { useRouter } from 'next/navigation'
// import { AppRoutes } from '@/utils/routes'

export const LoginModal = () => {
  // const router = useRouter()
  const { closeModal } = useModal()
  const t = useTranslations(I18nNamespaces.Auth)

  const initialValues: LoginFormValues = {
    email: '',
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })

  const handleSubmit = (values: LoginFormValues) => {
    console.log('wysyłanie linka do logowania', values)
  }

  return (
    <div className={styles.overlay} onClick={() => closeModal()}>
      <div
        className={styles.container}
        data-testid="loginToPublishJobPopup"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.header}>{t('loginToPublish')}</h2>
        <p className={styles.description}>{t('loginToPublishDesc')}</p>
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
              <form onSubmit={handleSubmit} className={styles.actions}>
                <InputFormError error={touched.email && errors.email}>
                  <TextInput
                    label={t('loginLabelEmail')}
                    onBlur={handleBlur}
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                    dataTestId="loginEmail"
                    maxLength={255}
                  />
                </InputFormError>
                <Button type="submit" variant="primary">
                  {t('loginLabelButton')}
                </Button>
              </form>
            )}
          </Formik>
          <p className={styles.or}>lub</p>
          <Button variant="secondary" type="button">
            {t('signInWithGoogle')}
          </Button>
          <p className={styles.haventAccount}>{t('haventAccount')}</p>
          <Button variant="tertiary" type="button">
            {t('signUp')}
          </Button>
        </div>
      </div>
    </div>
  )
}
