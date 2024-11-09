'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { AddIcon } from '@gdh/ui-system/icons'
import { signIn, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

const CreateProfileBtn = () => {
  const [isCalled, setIsCalled] = useState(false)

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
      Create profile
      <AddIcon />
    </Button>
  )
}

export default CreateProfileBtn
