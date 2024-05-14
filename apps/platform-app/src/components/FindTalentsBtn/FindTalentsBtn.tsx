'use client'
import { I18nNamespaces } from '@/I18nNamespaces'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

interface FindTalentsBtnProps {
  variant: 'primary' | 'secondary' | 'tertiary'
}

const FindTalentsBtn = (props: FindTalentsBtnProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations(I18nNamespaces.Index)

  if (pathname === AppRoutes.profilesList) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.profilesList)}
      variant={props.variant}
    >
      {t('findtalents')}{' '}
    </Button>
  )
}

export default FindTalentsBtn
