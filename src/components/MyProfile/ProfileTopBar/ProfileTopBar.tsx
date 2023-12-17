import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { EditProfileButton } from '@/components/EditProfileButton'
import { TogglePublishButton } from '@/components/TogglePublishButton/TogglePublishButton'
import { authOptions } from '@/lib/auth'
import { AppRoutes } from '@/utils/routes'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './ProfileTopBar.module.scss'

const ProfileTopBar = async () => {
  const session = await getServerSession(authOptions)

  if (!session || !session.user || !session.user.id) {
    redirect(AppRoutes.home)
  }

  const profile = await getProfileByUserEmail(session.user.email)

  if (!profile) {
    redirect(AppRoutes.createProfile)
  }

  return (
    <div className={styles.titleBox}>
      <span className={styles.title}>Profile preview</span>
      <div className={styles.buttonBox}>
        <EditProfileButton />
        <TogglePublishButton state={profile.state} profileId={profile.id} />
      </div>
    </div>
  )
}

export default ProfileTopBar
