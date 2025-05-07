'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const PostJobBtn = () => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Buttons)

  return (
    <Button
      onClick={() => router.push(AppRoutes.postJob)}
      variant="primary"
      dataTestId="postJobButton"
    >
      {t('postJob')}
    </Button>
  )
}

export default PostJobBtn
