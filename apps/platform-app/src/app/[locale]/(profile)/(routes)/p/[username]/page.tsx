import UserProfileDetails from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import { UserProfilePage } from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfilePage/UserProfilePage'
import UserProfileHeader from '@/app/[locale]/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import { getProfileBySlug } from '@/backend/profile/profile.service'
import { getAuthorizedUser } from '@/utils/auth.helpers'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import { findProfileBySlug } from '../../../_actions/queries/findProfileBySlug'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params

  try {
    const selectedProfile = await getProfileBySlug(username)

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

const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>
}) => {
  const { username } = await params
  const { user: authorizedUser } = await getAuthorizedUser()
  if (!authorizedUser) {
    return redirect(AppRoutes.signIn)
  }

  const profile = await findProfileBySlug(username)

  if (!profile) {
    redirect(AppRoutes.home)
  }

  // const user = await findUserByEmail(selectedProfile.userEmail)
  // const isConnectedToNerdbord = !!user?.nerdbordUserId
  const isConnectedToNerdbord = false // connected to nerdbord feature is currently dissabled

  return (
    <UserProfilePage profileId={profile.id}>
      <UserProfileMain profileId={profile.id} />
      <UserProfileHeader
        isNerdbordConnected={isConnectedToNerdbord}
        withBackButton
        profileId={profile.id}
      />
      <UserProfileDetails profileId={profile.id} />
    </UserProfilePage>
  )
}

export default UserProfile
