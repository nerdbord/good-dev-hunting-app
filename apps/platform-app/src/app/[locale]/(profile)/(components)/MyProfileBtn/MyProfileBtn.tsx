'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const MyProfileBtn = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const router = useRouter()
  const path = usePathname()

  if (path.includes(AppRoutes.myProfile) || path.includes(AppRoutes.home)) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.myProfile)}
      variant={'primary'}
    >
      {t('myProfile')}{' '}
    </Button>
  )
}

export default MyProfileBtn
