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
import Loader from '@/components/Loader/Loader'
import { useSession } from 'next-auth/react'
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

  if (status === 'loading') {
    return <Loader />
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
