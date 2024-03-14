import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import {
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterBySeniority,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { getPublishedProfilesPayload } from '@/backend/profile/profile.service'
import Loader from '@/components/Loader/Loader'
import { Suspense } from 'react'

export default async function Home({
  searchParams,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
}) {
  const profiles = await getPublishedProfilesPayload()

  const filteredProfiles = profiles
    .filter(filterBySeniority(searchParams.seniority?.split(',')))
    .filter(filterByLocation(searchParams.location?.split(',')))
    .filter(filterByTechnology(searchParams.technology?.split(',')))
    .filter(filterByAvailability(searchParams.availability?.split(',')))
    .filter(filterByFullName(searchParams.search))

  return (
    <Suspense key={JSON.stringify(searchParams)} fallback={<Loader />}>
      <ProfileList profiles={filteredProfiles} />
    </Suspense>
  )
}
