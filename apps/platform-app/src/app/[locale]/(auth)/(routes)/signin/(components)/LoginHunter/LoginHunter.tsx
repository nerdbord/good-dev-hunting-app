'use client'

import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../../page.module.scss'

// components
import { LinkedInLoginButton } from '@/app/[locale]/(auth)/(components)/LinkedInLoginButton/LinkedInLoginButton'
import { findUserByEmail } from '@/app/[locale]/(auth)/_actions/queries/findUserByEmail'
import { Roles } from '@/app/[locale]/(auth)/_models/User.model'
import TextInput from '@/components/TextInput/TextInput'
import { Box, Button, CheckboxInput } from '@gdh/ui-system'

const LoginHunter = () => {
  const t = useTranslations(I18nNamespaces.LoginHunter)
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [email, setEmail] = useState('')

  const handleSignIn = async (email: string) => {
    setIsLoading(true)
    try {
      const existingUser = await findUserByEmail(email)
      if (existingUser) {
        if (!existingUser.roles.includes(Roles.HUNTER)) {
          throw new Error('User is already registered as Specialist.')
        }
      }
      const result = await signIn('email', {
        email: email,
        redirect: false,
        callbackUrl: `${AppRoutes.oAuth}?role=${Roles.HUNTER}`,
      })
      if (result?.error) {
        setError(result.error)
      } else {
        setIsSubmited(true)
      }
    } catch (error) {
      setError('Failed to sign in. Ensure you are not registered as Specialist')
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <Box>
        <h2>Oops! Something went wrong! 😢</h2>
        <p>{error}</p>
      </Box>
    )
  }

  if (isSubmited) {
    return (
      <Box>
        <h2>Magic Link sent 🪄</h2>
        <p>Access platform via link sent to your email adress.</p>
      </Box>
    )
  }

  return (
    <Box>
      <h2>{t('login')}</h2>
      <p>{t('description')}</p>
      <form>
        <TextInput
          label="Email"
          tooltipText="Account associated with this email must always be Hunter and cannot be specialist."
          addImportantIcon={true}
          placeholder="eg. peter.parker@oscorp.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ marginBottom: '24px', marginTop: '16px' }}>
          <CheckboxInput
            id={'terms'}
            label=""
            checked={isChecked}
            onChange={() => {
              setIsChecked((prevState) => !prevState)
            }}
            name={'terms'}
          >
            <span style={{ fontSize: '14px', justifyContent: 'baseline' }}>
              {t('policyOne')}{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href="https://glory-licorice-2e2.notion.site/Good-Dev-Hunting-User-Terms-and-Conditions-77b1c52963f94edbb898a36e2a2ac512"
              >
                T&C
              </Link>{' '}
              {t('policyTwo')}{' '}
              <Link
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href="https://glory-licorice-2e2.notion.site/Privacy-policy-6c075e8ad0de4927addf9592bb29de6e?pvs=4"
              >
                {t('policyThree')}{' '}
              </Link>
            </span>
          </CheckboxInput>
        </div>
      </form>
      <div className={styles.btnsContainer}>
        <Button
          loading={isLoading}
          disabled={!isChecked}
          onClick={(e) => {
            e.preventDefault()
            handleSignIn(email.trim().toLowerCase())
          }}
          variant={'primary'}
        >
          {t('joinAsAHunter')}{' '}
        </Button>
        <span>{t('or')}</span>
        <LinkedInLoginButton
          label={t('loginWithLinkedin')}
          role={Roles.HUNTER}
        />
      </div>
    </Box>
  )
}

export default LoginHunter
