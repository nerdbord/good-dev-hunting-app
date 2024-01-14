'use client'
import React from 'react'
import { Button } from '@/components/Button/Button'
import { AppRoutes } from '@/utils/routes'
import { usePathname, useRouter } from 'next/navigation'

const FindTalentsBtn = () => {
  const router = useRouter()
  const pathname = usePathname()

  if (pathname === AppRoutes.profiles) {
    return null
  }

  return (
    <Button
      onClick={() => router.push(AppRoutes.profiles)}
      variant={'secondary'}
    >
      Find talents
    </Button>
  )
}

export default FindTalentsBtn
