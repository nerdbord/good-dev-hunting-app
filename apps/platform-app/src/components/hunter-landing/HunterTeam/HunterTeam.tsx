import { findAllTeamProfiles } from '@/app/[locale]/(profile)/_actions/queries'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './HunterTeam.module.scss'
import TeamMembersCarousel from './TeamMembersCarousel'

export const HunterTeam = async () => {
  const t = await getTranslations(I18nNamespaces.HunterTeam)
  const teamProfiles = await findAllTeamProfiles()

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{t('title')}</h2>
        <p className={styles.description}>
          <span>{t('descriptionBold')}</span>
          {t('description')}
        </p>
        <p className={styles.signature}>{t('signature')}</p>
      </div>

      <TeamMembersCarousel teamProfiles={teamProfiles} />
    </section>
  )
}

export default HunterTeam
