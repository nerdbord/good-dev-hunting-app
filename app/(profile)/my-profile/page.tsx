import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/inputs/LogOutBtn/LogOutBtn'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  try {
    const response = await fetch('http://localhost:3000/api/profiles/me')

    if (!response.ok) {
      console.error('Error status:', response.status)
      const errorText = await response.text()
      console.error('Error text:', errorText)
    }

    const profileData = await response.json()

    return (
      <div className={styles.wrapper}>
        <ProfileTopBar />
        <ProfileMain />
        <ProfileDetails />
        <div>
          <span>siemka {profileData.fullName}</span>
        </div>
        <LogOutBtn />
      </div>
    )
  } catch (error) {
    console.error('Error fetching profile:', error)
  }
}

export default MyProfilePage
