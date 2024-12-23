'use client'
import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import {
  createFiltersObjFromSearchParams,
  filterProfiles,
  getProfileCurrentState,
  sortProfilesBySalary,
} from '@/app/[locale]/(profile)/profile.helpers'
import { type SearchParamsFilters } from '@/app/[locale]/(profile)/profile.types'
import { I18nNamespaces } from '@/i18n/request'
import { Loader } from '@gdh/ui-system'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import styles from './ProfileList.module.scss'

const ProfileList = () => {
  const { status } = useSession()
  const { profiles } = useProfilesStore(getProfileCurrentState)
  const searchParams = useSearchParams()

  const filters: SearchParamsFilters = useMemo(
    () => createFiltersObjFromSearchParams(searchParams),
    [searchParams],
  )

  const filteredProfiles = useMemo(
    () => filterProfiles(profiles, filters),
    [filters],
  )

  const sortedProfiles = filteredProfiles.sort(sortProfilesBySalary)

  const t = useTranslations(I18nNamespaces.Index)
  if (status === 'loading') {
    return <Loader>{t('title')}</Loader>
  }

  if (profiles.length === 0) {
    return (
      <div className={styles.profileCards}>
        <div className={styles.profileListCont}>
          <p>No matching profiles found</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.profileCards}>
      <div className={styles.profileListCont}>
        {sortedProfiles.map((profile) => (
          <ProfileListItem key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}
export default ProfileList
