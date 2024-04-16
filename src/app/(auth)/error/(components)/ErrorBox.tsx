'use client'

import Box from '@/components/Box/Box'
import { Button } from '@/components/Button/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './ErrorBox.module.scss'

const ErrorBox = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const urlError =
    searchParams.get('error') === 'AccessDenied'
      ? 'Email already in use with a different provider!'
      : ''

  const handleClick = () => {
    router.back()
  }
  return (
    <div className={styles.errorBox}>
      <Box>
        <h2>Oops! Something went wrong!</h2>
        <p>{urlError}</p>
        <Button variant={'secondary'} onClick={handleClick}>
          Go back
        </Button>
      </Box>
    </div>
  )
}

export default ErrorBox
