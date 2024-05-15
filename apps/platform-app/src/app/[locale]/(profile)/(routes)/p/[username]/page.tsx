import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import UserProfileDetails from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import UserProfileHeader from '@/app/[locale]/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import { findProfileByGithubUsername } from '@/app/[locale]/(profile)/_actions/queries/findProfileByGithubUsername'
import { ProfileProvider } from '@/app/[locale]/(profile)/_providers/Profile.provider'
import { getProfileByGithubUsername } from '@/backend/profile/profile.service'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
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
        images: selectedProfile.user.avatarUrl || '',
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
  const { user: authorizedUser } = await getAuthorizedUser()
  if (!authorizedUser) {
    return redirect(AppRoutes.signIn)
  }

  const profile = await findProfileByGithubUsername(params.username)
  if (!profile) {
    redirect(AppRoutes.profilesList)
  }

  // const user = await findUserByEmail(selectedProfile.userEmail)
  // const isConnectedToNerdbord = !!user?.nerdbordUserId
  const isConnectedToNerdbord = false // connected to nerdbord feature is currently dissabled

  return (
    <ProfileProvider profile={profile}>
      <div className={styles.wrapper}>
        <UserProfileMain profileId={profile.id}>
          <UserProfileHeader
            isNerdbordConnected={isConnectedToNerdbord}
            withBackButton
            profileId={profile.id}
          />
        </UserProfileMain>
        <UserProfileDetails profileId={profile.id} />
      </div>
    </ProfileProvider>
  )
}

export default UserProfilePage
