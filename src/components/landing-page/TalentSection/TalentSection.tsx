import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { getRandomProfiles } from '@/backend/profile/profile.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import styles from './TalentSection.module.scss'

const TalentSection = async () => {
  const profiles = await getRandomProfiles(6)

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
      <div className={styles.talents}>
        {profiles?.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
      <FindTalentsBtn variant="primary">Find all talents</FindTalentsBtn>
    </section>
  )
}

export default TalentSection
