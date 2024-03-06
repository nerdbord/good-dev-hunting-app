import FiltersWithData from '@/app/(profile)/(components)/Filters/FiltersWithData'
import {
  filterByAvailability,
  filterByLocation,
  filterByPosition,
  filterBySeniority,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'

import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  const profiles = await getPublishedProfilesPayload()

  const filteredProfiles = profiles
    .filter(filterByPosition(searchParams.position?.split(',')))
    .filter(filterBySeniority(searchParams.seniority?.split(',')))
    .filter(filterByLocation(searchParams.location?.split(',')))
    .filter(filterByTechnology(searchParams.technology?.split(',')))
    .filter(filterByAvailability(searchParams.availability?.split(',')))

  return (
    <Suspense fallback={<Loader />}>
      <FiltersWithData />
      <ProfileList profiles={filteredProfiles} />
    </Suspense>
  )
}
