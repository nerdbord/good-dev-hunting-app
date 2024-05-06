'use client'

import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

export const EditProfileButton = () => {
  const router = useRouter()
  const t = useTranslations('Buttons')

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
