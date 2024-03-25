'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

interface LoginBtnProps {
  children: string
  variant: 'secondary' | 'tertiary'
}

const LoginBtn = (props: LoginBtnProps) => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === AppRoutes.signIn) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.signIn)}
      variant={props.variant}
    >
      {props.children}
    </Button>
  )
}

export default LoginBtn
