import ModerationProfilesWithFilter from '@/components/ProfileList/ModerationProfilesWithFilter'
import { getAllPublishedProfilesPayload } from '@/backend/profile/profile.service'

import styles from './ProfileList.module.scss'

export default async function ModerationProfileList() {
  const profiles = await getAllPublishedProfilesPayload()

  return (
    <div className={styles.mainContainer}>
      <ModerationProfilesWithFilter data={profiles} />
    </div>
  )
}
