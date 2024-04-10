'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

interface FindTalentsBtnProps {
  variant: 'primary' | 'secondary' | 'tertiary'
}

const FindTalentsBtn = (props: FindTalentsBtnProps) => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === AppRoutes.profilesList) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.profilesList)}
      variant={props.variant}
    >
      Find talents
    </Button>
  )
}

export default FindTalentsBtn
