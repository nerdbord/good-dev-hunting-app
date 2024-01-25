import React from 'react'
import styles from './page.module.scss'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileDetails from '@/components/UserProfile/UserProfileDetails/UserProfileDetails'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { redirect } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import UserProfileHeader from '@/components/Headers/UserProfileHeader/UserProfileHeader'

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const selectedProfile = await getProfileByUserId(params.id)

    if (!selectedProfile) {
      return {
        title: 'Not Found',
        description: 'The page you are looking for does not exist.',
      }
    }

    return {
      title: selectedProfile.fullName,
      description: selectedProfile.bio,
      openGraph: {
        images: selectedProfile.avatarUrl || '',
      },
    }
  } catch (error) {
    console.log(error)
    return {
      title: 'Not Found',
      description: 'The page you are looking for does not exist.',
    }
  }
}

const UserProfilePage = async ({ params }: { params: { id: string } }) => {
  const selectedProfile = await getProfileByUserId(params.id)

  if (!selectedProfile) {
    redirect(AppRoutes.profiles)
  }

  return (
    <div className={styles.wrapper}>
      <UserProfileMain userProfile={selectedProfile}>
        <UserProfileHeader withBackButton userProfile={selectedProfile} />
      </UserProfileMain>
      <UserProfileDetails userProfile={selectedProfile} />
    </div>
  )
}

export default UserProfilePage
