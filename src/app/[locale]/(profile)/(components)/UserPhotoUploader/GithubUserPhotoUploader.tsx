import { importAvatarFromGithub } from '@/app/[locale]/(auth)/_actions/mutations/importAvatarFromGithub'
import { useAsyncAction } from '@/hooks/useAsyncAction'
import { useTranslations } from 'next-intl'
import React from 'react'
import { Button } from '../../../../../components/Button/Button'

interface Props {
  setImage: (url: string) => void
  showError: React.Dispatch<React.SetStateAction<boolean>>
}

const GithubUserPhotoUploader = ({ setImage, showError }: Props) => {
  const t = useTranslations('Buttons')
  const { runAsync, loading } = useAsyncAction()

  const importFromGithub = () => {
    runAsync(async () => {
      const avatarUrl = await importAvatarFromGithub()
      if (!avatarUrl) {
        showError(true)
        return
      }

      showError && showError(false)
      setImage(avatarUrl)
    })
  }

  return (
    <Button variant="secondary" onClick={importFromGithub} disabled={loading}>
      {loading ? t('importing') : t('importFromGithub')}
    </Button>
  )
}

export default GithubUserPhotoUploader
