'use client'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './CvUploader.module.scss'
import { CVuploaderForm } from './CvUploaderForm'

export const CVUploader = () => {
  const t = useTranslations(I18nNamespaces.PersonalInfo)
  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>{t('cvFile')}</p>
      <CVuploaderForm />
    </div>
  )
}
