'use client'

import { useState } from 'react'

// components
import Box from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import TextInput from '@/components/TextInput/TextInput'
import { AppRoutes } from '@/utils/routes'
import { signIn } from 'next-auth/react'

const LoginHunter = () => {
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
          result.error === 'AccessDenied'
            ? 'User is already a specialist!'
            : result.error,
        )
      } else {
        setIsSubmited(true)
      }
    } catch (error) {
      setError('Failed to sign in. Please try again later.')
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
      <h2>Login as talent Hunter</h2>
      <p>
        Join and login alaways with magic link. Hunters don't have public
        profiles.
      </p>
      <form>
        <TextInput
          label="Email"
          tooltipText=" Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          addImportantIcon={true}
          placeholder="eg. peter.parker@oscorp.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ marginBottom: '24px', marginTop: '16px' }}>
          <CheckboxInput
            id={'terms'} // TODO enum
            label={'I have read and accept T&C and Privacy Policy'}
            checked={isChecked}
            onChange={() => {
              setIsChecked((prevState) => !prevState)
            }}
            name={'terms'} // TODO enum
          />
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
          Join as a Hunter
        </Button>
      </form>
    </Box>
  )
}

export default LoginHunter
