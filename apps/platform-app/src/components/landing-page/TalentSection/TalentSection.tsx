'use client'
import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { I18nNamespaces } from '@/i18n'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import styles from './TalentSection.module.scss'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'

const TalentSection = () => {
  const t = useTranslations(I18nNamespaces.TalentSection)
  const { profiles } = useProfilesStore((state) => state)

  const randomSixProfiles = useMemo(
    () => profiles.sort(() => 0.5 - Math.random()).slice(0, 6),
    [profiles],
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>{t('title')}</span>
        <small>{t('description')} </small>
      </div>
      <div className={styles.talents}>
        {randomSixProfiles?.map((profile) => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
      <FindTalentsBtn variant="primary" />
    </section>
  )
}

export default TalentSection
