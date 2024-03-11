import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import {
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterByPosition,
  filterBySeniority,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import styles from './ProfileList.module.scss'

const ProfileList = async ({
  filters,
}: {
  filters: Record<JobOfferFiltersEnum, string>
}) => {
  // const shuffledProfiles = shuffleArray(profiles)
  const profiles = await getPublishedProfilesPayload()

  const filteredProfiles = profiles
    .filter(filterByPosition(filters.position?.split(',')))
    .filter(filterBySeniority(filters.seniority?.split(',')))
    .filter(filterByLocation(filters.location?.split(',')))
    .filter(filterByTechnology(filters.technology?.split(',')))
    .filter(filterByAvailability(filters.availability?.split(',')))
    .filter(filterByFullName(filters.search))

  if (filteredProfiles.length === 0) {
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
        {filteredProfiles.map((profile) => (
          <ProfileListItem key={profile.id} data={profile} />
        ))}
      </div>
    </div>
  )
}
export default ProfileList
