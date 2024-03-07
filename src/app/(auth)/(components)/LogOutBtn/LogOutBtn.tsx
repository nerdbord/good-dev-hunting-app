'use client'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'

const LogOutBtn = () => {
  const { data: session } = useSession()
  const [isCalled, setIsCalled] = useState(false)
  return (
    <div>
      <Button
        variant={'secondary'}
        disabled={isCalled}
        onClick={() => {
          setIsCalled(true)
          signOut({ callbackUrl: AppRoutes.home })
        }}
      >
        Log out
      </Button>
    </div>
  )
}

export default LogOutBtn
