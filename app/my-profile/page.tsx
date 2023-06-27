import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'
import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'
import ProfileMain from '@/components/ProfileMain/ProfileMain'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <>
      <ProfileMain />
      <LogOutBtn />
    </>
  )
}

export default MyProfilePage
