'use client'
import { Button } from '@gdh/ui-system'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

const ModerationBtn = () => {
  const router = useRouter()
  const path = usePathname()

  if (path.includes(AppRoutes.moderation)) {
    return null
  }

  const onClickHandler = async () => {
    router.push(AppRoutes.moderation)
  }

  return (
    <Button
      onClick={onClickHandler}
      variant="secondary"
      dataTestId="moderationButton"
    >
      Moderation
    </Button>
  )
}

export default ModerationBtn
