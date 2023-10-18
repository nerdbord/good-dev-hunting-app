'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'
import AddIcon from '@/assets/icons/AddIcon'
import { signIn, useSession } from 'next-auth/react'

const CreateProfileBtn = ({ profileId }: { profileId: string | null }) => {
  const router = useRouter()
  const { data: session } = useSession()

  const onClickHandler = async () => { 
    if (status === 'authenticated') {
      await signIn('github');
    }

    const { data: updatedSession } = useSession();
    if (updatedSession && !profileId) {
      router.push(AppRoutes.createProfile);
    }
  };

  return (
    <Button
      onClick={onClickHandler}
      variant={'primary'}
    >
      Create profile
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
