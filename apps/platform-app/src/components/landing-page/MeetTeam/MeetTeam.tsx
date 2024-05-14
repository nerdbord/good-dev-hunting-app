import { findAllTeamProfiles } from '@/app/[locale]/(profile)/_actions/queries/findAllTeamProfiles'
import VerticalCard from '@/components/VerticalCard/VerticalCard'
import { I18nNamespaces } from '@/i18n'
import { getTranslations } from 'next-intl/server'
import styles from './MeetTeam.module.scss'

const MeetTeam = async () => {
  const t = await getTranslations(I18nNamespaces.MeetTeam)
  const teamProfiles = await findAllTeamProfiles()

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
        <p className={styles.sectionName}>{t('sectionName')}</p>
        <h2 className={styles.title}>{t('title')}</h2>
        <h5 className={styles.subtitle}>{t('subtitle')}</h5>
      </div>
      <div className={styles.cardsWrapper}>
        <div className={styles.slider}>
          <div className={styles.cardsBox}>
            {firstHalfProfiles.map((profile) => (
              <VerticalCard
                avatarUrl={profile.avatarUrl}
                city={profile.city}
                country={profile.country}
                employmentTypes={profile.employmentTypes}
                fullName={profile.fullName}
                githubUsername={profile.githubUsername}
                isOpenForWork={profile.isOpenForWork}
                position={profile.position}
                remoteOnly={profile.remoteOnly}
                seniority={profile.seniority}
                techStack={profile.techStack}
              />
            ))}
          </div>
        </div>
        {!!secondHalfProfiles.length && (
          <div className={styles.slider}>
            <div className={styles.cardsBox}>
              {secondHalfProfiles.map((profile) => (
                <VerticalCard
                  avatarUrl={profile.avatarUrl}
                  city={profile.city}
                  country={profile.country}
                  employmentTypes={profile.employmentTypes}
                  fullName={profile.fullName}
                  githubUsername={profile.githubUsername}
                  isOpenForWork={profile.isOpenForWork}
                  position={profile.position}
                  remoteOnly={profile.remoteOnly}
                  seniority={profile.seniority}
                  techStack={profile.techStack}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default MeetTeam
