// components
import { GithubLoginButton } from '@/app/[locale]/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import { I18nNamespaces } from '@/i18n/request'
import { Box } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'

const LoginDev = () => {
  const t = useTranslations(I18nNamespaces.LoginDev)
  return (
    <Box>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <GithubLoginButton label={t('loginWithGithub')} />
    </Box>
  )
}

export default LoginDev
