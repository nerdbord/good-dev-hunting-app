'use client'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './CvUploader.module.scss'
import { CVuploaderForm } from './CvUploaderForm'

type CVUploaderProps = {
  initialCvUrl: string | null;
};

export const CVUploader = ({ initialCvUrl }: CVUploaderProps) => {
  const t = useTranslations(I18nNamespaces.PersonalInfo)
  return (
    <div className={styles.container}>
      <p className={styles.containerLabel}>{t('cvFile')}</p>
      <CVuploaderForm initialCvUrl={initialCvUrl} />
    </div>
  )
}
