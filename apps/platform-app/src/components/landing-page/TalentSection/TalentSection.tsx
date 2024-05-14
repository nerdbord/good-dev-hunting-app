'use client'
import { I18nNamespaces } from '@/I18nNamespaces'
import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfiles } from '@/app/[locale]/(profile)/_providers/Profiles.provider'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'
import styles from './TalentSection.module.scss'

const TalentSection = () => {
  const t = useTranslations(I18nNamespaces.TalentSection)
  const { allProfiles } = useProfiles()

  const randomSixProfiles = useMemo(
    () => allProfiles.sort(() => 0.5 - Math.random()).slice(0, 6),
    [allProfiles],
  )

  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>{t('title')}</span>
        <small>{t('description')} </small>
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
