import React from 'react'
import styles from './TalentSection.module.scss'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { getRandonProfiles } from '@/backend/profile/profile.service'
import Link from 'next/link'
import { AppRoutes } from '@/utils/routes'

const TalentSection = async () => {
  const profiles = await getRandonProfiles(6)

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
