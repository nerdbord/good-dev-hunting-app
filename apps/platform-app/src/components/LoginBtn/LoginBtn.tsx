'use client'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useRouter } from 'next/navigation'

interface LoginBtnProps {
  children: string
  variant: 'secondary' | 'tertiary'
}

const LoginBtn = (props: LoginBtnProps) => {
  const router = useRouter()

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
