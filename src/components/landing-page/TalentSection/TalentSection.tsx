import React from 'react'
import styles from './TalentSection.module.scss'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import ProfileCard from '@/components/ProfileCard/ProfileCard'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import Link from 'next/link'
import { AppRoutes } from '@/utils/routes'
import { ProfileModel } from '@/data/frontend/profile/types'

const TalentSection = async () => {
  const profiles = await getPublishedProfilesPayload()

  let randomProfiles: ProfileModel[] = []
  if (profiles.length >= 6) {
    const randomIndices = new Set<number>()
    while (randomIndices.size < 6) {
      const randomIndex = Math.floor(Math.random() * profiles.length)
      randomIndices.add(randomIndex)
    }
    randomProfiles = Array.from(randomIndices).map((index) => profiles[index])
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
      <div className={styles.talents}>
        {randomProfiles.map((cardData) => (
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
