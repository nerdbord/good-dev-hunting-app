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

  return <ProfileList profiles={filteredProfiles} />
}
