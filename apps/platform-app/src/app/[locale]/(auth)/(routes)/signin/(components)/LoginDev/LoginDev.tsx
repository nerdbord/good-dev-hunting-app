import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

// components
import { GithubLoginButton } from '@/app/[locale]/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { LinkedInLoginButton } from '@/app/[locale]/(auth)/(components)/LinkedInLoginButton/LinkedInLoginButton'
import { Roles } from '@/app/[locale]/(auth)/_models/User.model'
import { Box } from '@gdh/ui-system'
import styles from '../../page.module.scss'

const LoginDev = () => {
  const t = useTranslations(I18nNamespaces.LoginDev)
  return (
    <Box>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <div className={styles.btnsContainer}>
        <GithubLoginButton
          label={t('loginWithGithub')}
          role={Roles.SPECIALIST}
        />
        <span>{t('or')}</span>
        <LinkedInLoginButton
          label={t('loginWithLinkedin')}
          role={Roles.SPECIALIST}
        />
      </div>
    </Box>
  )
}

export default LoginDev
