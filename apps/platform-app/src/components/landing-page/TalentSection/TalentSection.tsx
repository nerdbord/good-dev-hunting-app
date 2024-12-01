'use client'
import ProfileCard from '@/app/[locale]/(profile)/(components)/ProfileCard/ProfileCard'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { useTranslations } from 'next-intl'
import Link from 'next/link'
import { useMemo } from 'react'
import styles from './TalentSection.module.scss'

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
          <Link
            href={`${AppRoutes.profile}/${profile.slug}`}
            className={`${styles.frameWrapper}`}
            key={profile.id}
          >
            <ProfileCard profile={profile} />
          </Link>
        ))}
      </div>
      <FindTalentsBtn variant="primary" />
    </section>
  )
}

export default TalentSection
