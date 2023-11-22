'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import AddIcon from '@/assets/icons/AddIcon'
import { signIn, useSession } from 'next-auth/react'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

const CreateProfileBtn = () => {
  const router = useRouter()
  const path = usePathname()
  const { data: session } = useSession()

  if (path.includes(AppRoutes.myProfile)) {
    return null
  }

  const onClickHandler = async () => {
    if (!session) {
      await signIn('github', {
        callbackUrl: AppRoutes.githubOAuth,
      })
      return
    }
    router.push(AppRoutes.createProfile)
  }

  return (
    <Button onClick={onClickHandler} variant={'primary'}>
      Create profile
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
