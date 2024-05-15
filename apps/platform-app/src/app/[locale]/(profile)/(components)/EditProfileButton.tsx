'use client'

import { Button } from '@/components/Button/Button'
import { I18nNamespaces } from '@/i18n'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const EditProfileButton = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const router = useRouter()

  const handleEditClick = () => {
    router.push(AppRoutes.editProfile)
  }

  return (
    <Button variant={'secondary'} onClick={handleEditClick}>
      {' '}
      {t('edit')}{' '}
    </Button>
  )
}
