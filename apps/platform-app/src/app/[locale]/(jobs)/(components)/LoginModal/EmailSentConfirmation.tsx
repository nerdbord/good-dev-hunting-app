'use client'

import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './LoginModal.module.scss'

export const EmailSentConfirmation = ({ email }: { email: string }) => {
  const t = useTranslations(I18nNamespaces.Auth)

  return (
    <div className={styles.container} onClick={(e) => e.stopPropagation()}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>{t('emailSent') || 'Email Sent'}</h2>
        <p className={styles.description}>
          {t('emailSentDesc') || 'We sent a login link to:'}
        </p>
        <p className={styles.emailHighlight}>{email}</p>
        <p className={styles.description}>
          {t('emailSentInstructions') || 
            'Check your inbox and click the link to log in. You can close this window.'}
        </p>
      </div>
    </div>
  )
}
