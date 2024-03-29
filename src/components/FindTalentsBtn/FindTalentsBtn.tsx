'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

interface FindTalentsBtnProps {
  variant: 'primary' | 'secondary'
}

const FindTalentsBtn = (props: FindTalentsBtnProps) => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === AppRoutes.profiles) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.profiles)}
      variant={props.variant}
    >
      Find talents
    </Button>
  )
}

export default FindTalentsBtn
