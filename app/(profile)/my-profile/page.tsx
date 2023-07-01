import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'
import ProfileMain from '@/components/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/ProfileDetails/ProfileDetails'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div>
      <ProfileMain />
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage
