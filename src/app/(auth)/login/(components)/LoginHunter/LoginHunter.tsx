'use client'

import { useState } from 'react'

// components
import Box from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import TextInput from '@/components/TextInput/TextInput'

const LoginHunter = () => {
  const [isChecked, setIsChecked] = useState(false)
  const [isSubmited, setIsSubmited] = useState(false)

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
          onChange={() => {
            console.log('')
          }}
        />
        <div style={{ marginBlock: '24px' }}>
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
          onClick={() => setIsSubmited(true)}
          variant={'primary'}
          disabled={false}
        >
          Join as a Hunter
        </Button>
      </form>
    </Box>
  )
}

export default LoginHunter
