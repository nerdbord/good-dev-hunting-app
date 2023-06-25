import React from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const MyProfilePage = () => {
  const session = useSession()
  const router = useRouter()

  if (session.status === 'loading') {
    return (
      <div><p>Loading...</p></div>
    )
  }

  if (session.status === 'unauthenticated') {
    router?.push("/")
  }

  if (session.status === 'authenticated') {
    return (
      <div><p>Create Profile Page</p></div>
    )
  }
}

export default MyProfilePage
