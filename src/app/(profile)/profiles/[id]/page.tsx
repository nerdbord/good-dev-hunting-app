import UserProfileDetails from '@/app/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileHeader from '@/app/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import styles from './page.module.scss'

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

  const user = await findUserByEmail(selectedProfile.userEmail)
  const isConnectedToNerdbord = !!user?.nerdbordUserId

  return (
    <div className={styles.wrapper}>
      <UserProfileMain userProfile={selectedProfile}>
        <UserProfileHeader
          isNerdbordConnected={isConnectedToNerdbord}
          withBackButton
          userProfile={selectedProfile}
        />
      </UserProfileMain>
      <UserProfileDetails userProfile={selectedProfile} />
    </div>
  )
}

export default UserProfilePage
