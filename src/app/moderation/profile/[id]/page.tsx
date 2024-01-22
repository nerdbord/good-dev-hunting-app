import { getProfileByUserId } from '@/backend/profile/profile.service'
import ModerationActionHeader from '@/components/Headers/ModerationActionHeader/ModerationActionHeader'
import UserProfileHeader from '@/components/Headers/UserProfileHeader/UserProfileHeader'
import UserProfileDetails from '@/components/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import { requireUserRoles } from '@/utils/auths'
import { AppRoutes } from '@/utils/routes'
import { Role } from '@prisma/client'
import { redirect } from 'next/navigation'

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
    redirect(AppRoutes.home)

  return (
    <div className={styles.wrapper}>
      <ModerationActionHeader userProfile={profile} userRoles={user.roles} />
      <UserProfileMain userProfile={profile}>
        <UserProfileHeader userProfile={profile} />
      </UserProfileMain>
      <UserProfileDetails userProfile={profile} />
    </div>
  )
}
