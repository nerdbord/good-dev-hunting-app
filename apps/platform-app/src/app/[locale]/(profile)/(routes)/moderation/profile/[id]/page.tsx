import ModerationActionHeader from '@/app/[locale]/(profile)/(routes)/moderation/(components)/ModerationActionHeader/ModerationActionHeader'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

import { findUserById } from '@/app/[locale]/(auth)/_actions'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions/queries/findProfileByUserId'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import UserProfileDetails from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import { ProfileProvider } from '@/app/[locale]/(profile)/_providers/Profile.provider'

import UserProfileHeader from '@/app/[locale]/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import styles from './page.module.scss'

export default async function ModerationUserProfile({
  params,
}: {
  params: { id: string }
}) {
  const { userIsModerator: authorizedUserIsModerator } =
    await getAuthorizedUser()

  const profile = await findProfileByUserId(params.id)
  const profileOwner = await findUserById(params.id)

  if (!profile || !authorizedUserIsModerator) redirect(AppRoutes.profilesList)

  return (
    <ProfileProvider profile={profile}>
      <div className={styles.wrapper}>
        <ModerationActionHeader profileOwnerRoles={profileOwner.roles} />
        <UserProfileMain profileId={profile.id}>
          <UserProfileHeader profileId={profile.id} withBackButton />
        </UserProfileMain>
        <UserProfileDetails profileId={profile.id} />
      </div>
    </ProfileProvider>
  )
}
