'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const LogOutBtn = () => {
  const [isCalled, setIsCalled] = useState(false)
  const t = useTranslations('Buttons')
  return (
    <div>
      <Button
        variant={'secondary'}
        disabled={isCalled}
        onClick={() => {
          setIsCalled(true)
          signOut({ callbackUrl: AppRoutes.home })
        }}
      >
        {t('logOut')}
      </Button>
    </div>
  )
}

export default LogOutBtn
