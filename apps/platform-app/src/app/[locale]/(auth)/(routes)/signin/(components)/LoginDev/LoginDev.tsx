// components
import { GithubLoginButton } from '@/app/[locale]/(auth)/(components)/GithubLoginButton/GithubLoginButton'
import Box from '@/components/Box/Box'
import { useTranslations } from 'next-intl'

const LoginDev = () => {
  const t = useTranslations('loginDev')
  return (
    <Box>
      <h2>{t('title')}</h2>
      <p>{t('description')}</p>
      <GithubLoginButton label={t('loginWithGithub')} />
    </Box>
  )
}

export default LoginDev
