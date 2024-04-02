import { getTeamProfiles } from '@/backend/profile/profile.service'
import VerticalCard from '@/components/VerticalCard/VerticalCard'
import { cache } from 'react'
import styles from './MeetTeam.module.scss'

const cacheGetTeamProfiles = cache(getTeamProfiles)

const MeetTeam = async () => {
  const teamProfiles = await cacheGetTeamProfiles()

  // Calculate midpoint differently to ensure one half has at least 4 items
  let midpoint
  if (teamProfiles.length < 8) {
    // Ensure the first half has at least 4 items, if total less than 8
    midpoint = 4
  } else {
    // Standard calculation if enough items for both halves to have at least 4
    midpoint = Math.ceil(teamProfiles.length / 2)
  }

  const firstHalfProfiles = teamProfiles.slice(0, midpoint)
  const secondHalfProfiles = teamProfiles.slice(midpoint)

  return (
    <section id="MeetTeam" className={styles.wrapper}>
      <div className={styles.titleBox}>
        <p className={styles.sectionName}>WORKING AS A TEAM</p>
        <h2 className={styles.title}>Meet our team</h2>
        <h5 className={styles.subtitle}>Meet passionates behind the scene</h5>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.slider}>
          <div className={styles.cardsBox}>
            {firstHalfProfiles.map((profile) => (
              <VerticalCard {...profile} />
            ))}
          </div>
        </div>
        {!!secondHalfProfiles.length && (
          <div className={styles.slider}>
            <div className={styles.cardsBox}>
              {secondHalfProfiles.map((profile) => (
                <VerticalCard {...profile} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MeetTeam
