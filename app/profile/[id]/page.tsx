import React from 'react'
import styles from './page.module.scss'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileDetails from '@//components/UserProfile/UserProfileDetails/UserProfileDetails'
import { getProfileByUserId } from '@/backend/profile/profile.service'

import { redirect } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const selectedUser = await getProfileByUserId(params.id)

  if (!selectedUser) {
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
