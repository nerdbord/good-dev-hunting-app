import { getRandomProfiles } from '@/backend/profile/profile.service'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { AppRoutes } from '@/utils/routes'
import Link from 'next/link'
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
        {profiles?.map((cardData) => (
          <Link
            href={`${AppRoutes.profiles}/${cardData.userId}`}
            key={cardData.id}
          >
            <ProfileCard data={cardData} />
          </Link>
        ))}
      </div>
      <FindTalentsBtn variant="primary">Find all talents</FindTalentsBtn>
    </section>
  )
}

export default TalentSection
