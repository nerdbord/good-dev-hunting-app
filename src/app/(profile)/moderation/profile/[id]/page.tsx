import UserProfileHeader from '@/app/(profile)/(components)/UserProfileHeader/UserProfileHeader'
import ModerationActionHeader from '@/app/(profile)/moderation/(components)/ModerationActionHeader/ModerationActionHeader'
import { getProfileByUserId } from '@/backend/profile/profile.service'
import { requireUserRoles } from '@/utils/auths'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'

import UserProfileDetails from '@/app/(profile)/(components)/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/app/(profile)/(components)/UserProfile/UserProfileMain/UserProfileMain'
import { findUserByEmail } from '@/backend/user/user.service'
import styles from './page.module.scss'

export default async function ModerationUserProfile({
  params,
}: {
  params: { id: string }
}) {
  const profile = await getProfileByUserId(params.id)
  const user = profile && (await findUserByEmail(profile.userEmail))

  if (!profile || !user || !requireUserRoles([Role.MODERATOR]))
    redirect(AppRoutes.profilesList)

  return (
    <div className={styles.wrapper}>
      <ModerationActionHeader userProfile={profile} userRoles={user.roles} />
      <UserProfileMain userProfile={profile}>
        <UserProfileHeader withBackButton userProfile={profile} />
      </UserProfileMain>
      <UserProfileDetails userProfile={profile} />
    </div>
  )
}
