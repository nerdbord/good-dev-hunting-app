import { authOptions } from '@/app/(auth)/auth'
import UserProfileDetails from '@/app/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileHeader from '@/app/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import { getProfileByGithubUsername } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { countProfileView } from '../../_actions/countProfileView'
import styles from './page.module.scss'

export async function generateMetadata({
  params,
}: {
  params: { username: string }
}) {
  try {
    const selectedProfile = await getProfileByGithubUsername(params.username)

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

const UserProfilePage = async ({
  params,
}: {
  params: { username: string }
}) => {
  const selectedProfile = await getProfileByGithubUsername(params.username)
  const session = await getServerSession(authOptions)

  if (!selectedProfile) {
    redirect(AppRoutes.profiles)
  }

  if (!session?.user) {
    redirect(AppRoutes.profiles)
  }

  try {
    await countProfileView(selectedProfile.id, session.user.id)
  } catch (error) {
    console.error('Error counting profile view:', error)
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
