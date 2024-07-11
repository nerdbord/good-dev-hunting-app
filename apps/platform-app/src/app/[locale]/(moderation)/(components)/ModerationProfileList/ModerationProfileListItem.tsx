import { StateStatus } from '@/app/[locale]/(moderation)/(components)/StateStatus/StateStatus'
import ProfileCard from '@/app/[locale]/(profile)/(components)/ProfileCard/ProfileCard'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
import styles from './ModerationProfileList.module.scss'

interface ModerationProfileListItemProps {
  profile: ProfileModel
}

export const ModerationProfileListItem = ({
  profile,
}: ModerationProfileListItemProps) => {
  return (
    <div className={styles.frameWrapper}>
      <Link href={`${AppRoutes.moderationProfile}/${profile.userId}`}>
        <ProfileCard key={profile.id} profile={profile} />
      </Link>
      <div className={styles.detailsWrapper}>
        <StateStatus profileId={profile.id} profileState={profile.state} />
      </div>
    </div>
  )
}
