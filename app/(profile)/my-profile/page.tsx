import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Container } from './container/Container'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <Container>
      <ProfileMain />
      <ProfileDetails />
      <LogOutBtn />
    </Container>
  )
}

export default MyProfilePage
