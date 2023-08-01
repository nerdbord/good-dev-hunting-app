import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/')
  }

  const profile = await getProfileByUserEmail(session.user.email)

  return (
    <div className={styles.wrapper}>
      <ProfileTopBar />
      <ProfileMain />
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage
