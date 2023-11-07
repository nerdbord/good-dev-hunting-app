import UserProfileHeader from '@/components/Headers/UserProfileHeader/UserProfileHeader'
import UserProfileDetails from '@/components/UserProfile/UserProfileDetails/UserProfileDetails'
import UserProfileMain from '@/components/UserProfile/UserProfileMain/UserProfileMain'
import ModerationActionHeader from '@/components/Headers/ModerationActionHeader/ModerationActionHeader'
import { AppRoutes } from '@/utils/routes'
import { redirect } from 'next/navigation'
import { Role } from '@prisma/client'
import { requireUserRoles } from '@/utils/auths'
import { getProfileByUserId } from '@/backend/profile/profile.service'

import styles from './page.module.scss'

export default async function ModerationUserProfile({
  params,
}: {
  params: { id: string }
}) {
  const profile = await getProfileByUserId(params.id)

  if (!profile || !requireUserRoles([Role.MODERATOR])) redirect(AppRoutes.home)

  return (
    <div className={styles.wrapper}>
      <ModerationActionHeader userProfile={profile} />
      <UserProfileMain userProfile={profile}>
        <UserProfileHeader userProfile={profile} />
      </UserProfileMain>
      <UserProfileDetails userProfile={profile} />
    </div>
  )
}
