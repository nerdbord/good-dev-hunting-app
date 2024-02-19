'use client'

// components
import Box from '@/app/(auth)/login/(components)/Box/Box'
import { Button } from '@/components/Button/Button'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import TextInput from '@/components/TextInput/TextInput'

const LoginHunter = () => {
  return (
    <Box>
      <h2>Login as talent Hunter</h2>
      <p>
        Join and login alaways with magic link. Hunters don’t have public
        profiles.
      </p>
      <TextInput
        label="Email"
        tooltipText="More info"
        addImportantIcon={true}
        placeholder="eg. peter.parker@oscorp.com"
        onChange={() => {
          console.log('')
        }}
      />
      {/* checkbox */}
      <CheckboxInput
        id={'policy'}
        label={'I have read and accept T&C and Privacy Policy'}
        checked={false}
        onChange={() => {
          console.log('')
        }}
        name={'policy'}
      />
      <Button variant={'primary'}>Join as a Hunter</Button>
    </Box>
  )
}

export default LoginHunter
