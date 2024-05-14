'use client'
import { Button } from '@/components/Button/Button'
import { I18nNamespaces } from '@/i18n'
import { AppRoutes } from '@/utils/routes'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const LogOutBtn = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const [isCalled, setIsCalled] = useState(false)
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
        {t('logOut')}{' '}
      </Button>
    </div>
  )
}

export default LogOutBtn
