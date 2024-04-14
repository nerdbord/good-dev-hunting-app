import UserProfileHeader from '@/app/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import ModerationActionHeader from '@/app/(profile)/moderation/(components)/ModerationActionHeader/ModerationActionHeader'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

import { findUserById } from '@/app/(auth)/_actions/findUserById'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import UserProfileDetails from '@/app/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import { findProfileByUserId } from '@/app/(profile)/_actions/findProfileByUserId'
import { ProfileProvider } from '@/app/(profile)/_providers/Profile.provider'
import styles from './page.module.scss'

export default async function ModerationUserProfile({
  params,
}: {
  params: { id: string }
}) {
  const { userIsModerator: authorizedUserIsModerator } =
    await getAuthorizedUser()

  const profile = await findProfileByUserId(params.id)
  const user = profile && (await findUserById(params.id))

  if (!profile || !user || !authorizedUserIsModerator)
    redirect(AppRoutes.profilesList)

  return (
    <ProfileProvider profile={profile}>
      <div className={styles.wrapper}>
        <ModerationActionHeader profile={profile} userRoles={user.roles} />
        <UserProfileMain profile={profile}>
          <UserProfileHeader profile={profile} withBackButton />
        </UserProfileMain>
        <UserProfileDetails profile={profile} />
      </div>
    </ProfileProvider>
  )
}
