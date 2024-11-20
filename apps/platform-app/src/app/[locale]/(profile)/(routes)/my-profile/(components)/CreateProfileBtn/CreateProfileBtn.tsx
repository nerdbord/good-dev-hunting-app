'use client'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { AddIcon } from '@gdh/ui-system/icons'
import { signIn, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const CreateProfileBtn = () => {
  const [isCalled, setIsCalled] = useState(false)
  const t = useTranslations(I18nNamespaces.Buttons)

  const router = useRouter()
  const path = usePathname()
  const { data: session } = useSession()

  if (path.includes(AppRoutes.myProfile)) {
    return null
  }

  const onClickHandler = async () => {
    setIsCalled(true)
    if (!session) {
      await signIn('github', {
        callbackUrl: AppRoutes.githubOAuth,
      })
      return
    }
    router.push(AppRoutes.createProfile)
  }

  return (
    <Button
      disabled={isCalled}
      onClick={onClickHandler}
      variant={'primary'}
      dataTestId="createProfileButton"
    >
      {t('createProfile')}
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
