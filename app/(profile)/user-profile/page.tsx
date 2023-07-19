import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileDetails from '@//components/UserProfile/UserProfileDetails/UserProfileDetails'

const UserProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/')
  }

  return (
    <div className={styles.wrapper}>
      <UserProfileMain />
      <UserProfileDetails />
    </div>
  )
}

export default UserProfilePage
