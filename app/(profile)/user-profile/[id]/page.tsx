import React from 'react'
import styles from './page.module.scss'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileDetails from '@//components/UserProfile/UserProfileDetails/UserProfileDetails'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions)
  const selectedUser = await getProfileByUserId(params.id)

  if (!session || !selectedUser) {
    redirect(AppRoutes.home)
  }

  return (
    <div className={styles.wrapper}>
      <UserProfileMain user={selectedUser} />
      <UserProfileDetails user={selectedUser} />
    </div>
  )
}

export default UserProfilePage
