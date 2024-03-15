import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import {
  filterByAvailability,
  filterByFullName,
  filterByLocation,
  filterBySeniority,
  filterByTechnology,
} from '@/app/(profile)/(components)/ProfileList/filters'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { getPublishedProfilesPayloadByPosition } from '@/backend/profile/profile.service'

export default async function SpecializationPage({
  searchParams,
  params,
}: {
  searchParams: Record<JobOfferFiltersEnum, string>
  params: { specialization: string }
}) {
  const profiles = await getPublishedProfilesPayloadByPosition(
    params.specialization,
  )

  const filteredProfiles = profiles
    .filter(filterBySeniority(searchParams.seniority?.split(',')))
    .filter(filterByLocation(searchParams.location?.split(',')))
    .filter(filterByTechnology(searchParams.technology?.split(',')))
    .filter(filterByAvailability(searchParams.availability?.split(',')))
    .filter(filterByFullName(searchParams.search))

  return <ProfileList profiles={filteredProfiles} />
}
