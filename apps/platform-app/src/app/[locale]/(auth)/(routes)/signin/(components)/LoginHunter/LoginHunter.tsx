'use client'

import { I18nNamespaces } from '@/i18n'
import { AppRoutes } from '@/utils/routes'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

// components
import Box from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import TextInput from '@/components/TextInput/TextInput'
import { useTranslations } from 'next-intl'

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
      const result = await signIn('email', {
        email: email.trim().toLowerCase(),
        redirect: false,
        callbackUrl: AppRoutes.profilesList,
      })
      if (result?.error) {
        setError(
          result.error === t('accesDenied') ? t('userExists') : result.error,
        )
      } else {
        setIsSubmited(true)
      }
    } catch (error) {
      setError(t('error'))
    } finally {
      setIsLoading(false)
    }
  }

  if (error) {
    return (
      <Box>
        <h2>{t('loginError')} 😢</h2>
        <p>{error}</p>
      </Box>
    )
  }

  if (isSubmited) {
    return (
      <Box>
        <h2>{t('magicLink')}🧙🏻‍♂️ </h2>
        <p>{t('magicAcces')}</p>
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
          tooltipText={t('magicTooltip')}
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
        <Button
          loading={isLoading}
          disabled={!isChecked}
          onClick={(e) => {
            e.preventDefault()
            handleSignIn(email)
          }}
          variant={'primary'}
        >
          {t('joinAsAHunter')}{' '}
        </Button>
      </form>
    </Box>
  )
}

export default LoginHunter
