import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'
import { getProfilePayload } from '@/lib/client/apiClient'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    const userId = session?.user.id
    const profilePayload = await getProfilePayload(userId)
  } else {
    redirect('/')
  }

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
