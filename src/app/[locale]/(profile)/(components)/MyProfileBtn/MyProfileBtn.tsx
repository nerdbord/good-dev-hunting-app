'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

const MyProfileBtn = () => {
  const router = useRouter()
  const path = usePathname()
  const t = useTranslations('Buttons')

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
