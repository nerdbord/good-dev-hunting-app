import React from 'react'
import styles from './page.module.scss'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import LogOutBtn from '@/components/LogOutBtn/LogOutBtn'
import ProfileTopBar from '@/components/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/components/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/components/MyProfile/ProfileDetails/ProfileDetails'
import { AppRoutes } from '@/utils/routes'
import { getProfileByUserEmail } from '@/backend/profile/profile.service'

export const revalidate = 0

const MyProfilePage = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)
  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <div className={styles.wrapper}>
      {/* @ts-expect-error Server Component */}
      <ProfileTopBar profileId={profile.id} />
      {/* @ts-expect-error Server Component */}
      <ProfileMain />
      {/* @ts-expect-error Server Component */}
      <ProfileDetails />
      <LogOutBtn />
    </div>
  )
}

export default MyProfilePage
