import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className={styles.wrapper}>
      <ProfileMain />
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage
