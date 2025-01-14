'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { AddIcon } from '@gdh/ui-system/icons'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

const CreateAnotherJobBtn = () => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Buttons)

  return (
    <Button
      onClick={() => router.push(AppRoutes.postJob)}
      variant="secondary"
      dataTestId="createAnotherJobButton"
    >
      {t('createAnotherJob')}
      <AddIcon />
    </Button>
  )
}

export default CreateAnotherJobBtn
