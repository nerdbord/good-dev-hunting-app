'use client'
import { I18nNamespaces } from '@/I18nNamespaces'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const MyProfileBtn = () => {
  const t = useTranslations(I18nNamespaces.Buttons)
  const router = useRouter()
  const path = usePathname()

  if (
    path.includes(AppRoutes.myProfile) ||
    path.includes(AppRoutes.profilesList)
  ) {
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
