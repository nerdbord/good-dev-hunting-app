import FiltersWithData from '@/app/(profile)/(components)/Filters/FiltersWithData'
import { ProfileListItem } from '@/app/(profile)/(components)/ProfileList/ProfileListItem'
import {
  filterByAvailability,
  filterByLocation,
  filterByPosition,
  filterBySeniority,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'

import styles from '@/app/(profile)/(components)/ProfileList/ProfileList.module.scss'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

// type ProfileCard = {
//   id: string,
//   githubUsername: string,
//   avatarUrl: string,
//   fullName: string,
//   seniority: string,
//   position: string,
//   country: string,
//   city: string,
//   employmentTypes: string[],
//   remoteOnly: boolean,
//   techStack: string[],
//   state: PublishingState

// }

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  // const profiles = await getPublishedProfilesByFilter(searchParams)
  const profiles = await getPublishedProfilesPayload()

  const filteredProfiles = profiles
    .filter(filterByPosition(searchParams.position?.split(',')))
    .filter(filterBySeniority(searchParams.seniority?.split(',')))
    .filter(filterByLocation(searchParams.location?.split(',')))
    .filter(filterByTechnology(searchParams.technology?.split(',')))
    .filter(filterByAvailability(searchParams.availability?.split(',')))

  console.log('profiles from home: ', filteredProfiles)
  return (
    // <FiltersProvider>
    <>
      <FiltersWithData />
      {/* <ProfileList profiles={profiles} /> */}
      <Suspense fallback={<Loader />}>
        <div className={styles.profileCards}>
          <div className={styles.profileListCont}>
            {filteredProfiles.map((profile) => (
              <ProfileListItem key={profile.id} data={profile} />
            ))}
          </div>
        </div>
      </Suspense>
    </>
    // </FiltersProvider>
  )
}
