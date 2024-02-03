'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

const MyProfileBtn = () => {
  const router = useRouter()
  const path = usePathname()

  if (path.includes(AppRoutes.myProfile) || path.includes(AppRoutes.profiles)) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.myProfile)}
      variant={'primary'}
    >
      My profile
    </Button>
  )
}

export default MyProfileBtn
