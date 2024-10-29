'use client'
import Loader from '@/components/Loader/Loader'
import { signOut } from 'next-auth/react'
import { useEffect } from 'react'

export default function LogoutPage() {
  useEffect(() => {
    signOut({
      callbackUrl: '/',
    })
  }, [])

  return <Loader />
}
