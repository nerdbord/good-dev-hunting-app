import ModerationActionHeader from '@/app/[locale]/(moderation)/(components)/ModerationActionHeader/ModerationActionHeader'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'

import { findUserById } from '@/app/[locale]/(auth)/_actions'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions/queries/findProfileByUserId'

import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import UserProfileDetails from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/[locale]/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'

import { ModerationUserProfilePage } from '@/app/[locale]/(moderation)/(components)/ModerationUserProfilePage/ModerationUserProfilePage'
import styles from '@/app/[locale]/(moderation)/(routes)/moderation/profile/[id]/page.module.scss'
import UserProfileHeader from '@/app/[locale]/(profile)/(components)/UserProfileHeader/UserProfileHeader'

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
    <ModerationUserProfilePage profileId={profile.id}>
      <ModerationActionHeader profileOwnerRoles={profileOwner.roles} />
      <div className={styles.container}>
        <UserProfileMain profileId={profile.id} />
        <UserProfileHeader profileId={profile.id} withBackButton />
        <UserProfileDetails profileId={profile.id} />
      </div>
    </ModerationUserProfilePage>
  )
}
