import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'

const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      Create profile page
      <br />
      <LogOutBtn />
    </div>
  )
}

export default CreateProfilePage
