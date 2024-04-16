'use client'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/(profile)/_providers/Profiles.provider'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { useMemo } from 'react'
import styles from './TalentSection.module.scss'

const TalentSection = () => {
  const { allProfiles } = useProfiles()

  const randomSixProfiles = useMemo(
    () => allProfiles.sort(() => 0.5 - Math.random()).slice(0, 6),
    [allProfiles],
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
      <div className={styles.talents}>
        {randomSixProfiles?.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
      <FindTalentsBtn variant="primary" />
    </section>
  )
}

export default TalentSection
