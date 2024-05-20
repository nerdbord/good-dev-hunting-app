'use client'
import { ProfileListItem } from '@/app/[locale]/(profile)/(components)/ProfileList/ProfileListItem'
import {
  createFiltersObjFromSearchParams,
  filterProfiles,
  sortProfilesBySalary,
} from '@/app/[locale]/(profile)/profile.helpers'
import Loader from '@/components/Loader/Loader'
import { useSession } from 'next-auth/react'
import styles from './ProfileList.module.scss'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { type SearchParamsFilters } from '@/app/[locale]/(profile)/profile.types'

const ProfileList = () => {
  const { status } = useSession()
  const { profiles } = useProfilesStore((state) => state)
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
          <ProfileListItem
            key={profile.id}
            data={profile}
            isHiddenName={true}
          />
        ))}
      </div>
    </div>
  )
}
export default ProfileList
