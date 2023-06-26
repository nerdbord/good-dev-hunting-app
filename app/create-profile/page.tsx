import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

const CreateProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!!session) {
    return <div>Create profile page</div>
  }
  if (!session) {
    redirect('/')
  }
}

export default CreateProfilePage
