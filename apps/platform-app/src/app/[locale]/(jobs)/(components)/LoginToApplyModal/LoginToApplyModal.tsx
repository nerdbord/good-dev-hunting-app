'use client'
import { GithubLoginButton } from '@/app/[locale]/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { LinkedInLoginButton } from '@/app/[locale]/(auth)/(components)/LinkedInLoginButton/LinkedInLoginButton'
import { Roles } from '@/app/[locale]/(auth)/_models/User.model'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import styles from './LoginToApplyModal.module.scss'

export const LoginToApplyModal = () => {
  const t = useTranslations(I18nNamespaces.LoginDev)
  const pathname = usePathname()
  return (
    <div className={styles.container}>
      <div>
        <h2>{t('loginToApply')}</h2>
        <p>{t('loginToApplyDescription')}</p>
      </div>
      <div className={styles.buttonsContainer}>
        <GithubLoginButton
          label={t('loginWithGithub')}
          role={Roles.SPECIALIST}
          redirect={true}
          redirectTo={pathname}
        />
        <span>{t('or')}</span>
        <LinkedInLoginButton
          label={t('loginWithLinkedin')}
          role={Roles.SPECIALIST}
          redirect={true}
          redirectTo={pathname}
        />
      </div>
    </div>
  )
}
