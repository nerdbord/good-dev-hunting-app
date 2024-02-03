'use client'
import AddIcon from '@/assets/icons/AddIcon'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { signIn, useSession } from 'next-auth/react'
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
    <Button
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
