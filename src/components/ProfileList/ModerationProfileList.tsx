import styles from '@/components/ProfileList/ProfileList.module.scss'
import { Container } from '@/components/Container/Container'
import ModerationProfilesWithFilter from '@/components/ProfileList/ModerationProfilesWithFilter'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'

export default async function ModerationProfileList() {
  const profiles = await getPublishedProfilesPayload()

  return (
    <div className={styles.mainContainer}>
      <Container>
        <ModerationProfilesWithFilter data={profiles} />
      </Container>
    </div>
  )
}
