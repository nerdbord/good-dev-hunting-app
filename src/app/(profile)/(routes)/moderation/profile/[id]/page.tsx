import UserProfileHeader from '@/app/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import ModerationActionHeader from '@/app/(profile)/(routes)/moderation/(components)/ModerationActionHeader/ModerationActionHeader'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import UserProfileDetails from '@/app/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import { findProfileByUserId } from '@/app/(profile)/_actions/queries/findProfileByUserId'
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

  if (!profile || !authorizedUserIsModerator) redirect(AppRoutes.profilesList)

  return (
    <ProfileProvider profile={profile}>
      <div className={styles.wrapper}>
        <ModerationActionHeader />
        <UserProfileMain profileId={profile.id}>
          <UserProfileHeader profileId={profile.id} withBackButton />
        </UserProfileMain>
        <UserProfileDetails profileId={profile.id} />
      </div>
    </ProfileProvider>
  )
}
