'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import AddIcon from '@/assets/icons/AddIcon'
import { signIn, useSession } from 'next-auth/react'
import { AppRoutes } from '@/utils/routes'

const CreateProfileBtn = () => {
  const { data: session } = useSession()

  const onClickHandler = async () => {
    if (!session) {
      await signIn('github', {
        callbackUrl: AppRoutes.githubOAuth,
      })
      return
    }
  }
  return (
    <Button onClick={onClickHandler} variant={'primary'}>
      Create profile
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
