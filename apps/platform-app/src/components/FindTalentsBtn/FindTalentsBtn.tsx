'use client'
import { I18nNamespaces } from '@/i18n'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
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
