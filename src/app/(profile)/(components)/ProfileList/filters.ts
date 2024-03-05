import { ProfileModel } from '@/app/(profile)/types'

export const filterByPosition =
  (positionFilter: string[]) => (profile: ProfileModel) => {
    if (!positionFilter) return true
    return positionFilter.some(
      (pos) => profile.position.toUpperCase() === pos.toUpperCase(),
    )
  }

export const filterBySeniority =
  (seniorityFilter: string[]) => (profile: ProfileModel) => {
    if (!seniorityFilter) return true
    return seniorityFilter.some(
      (filter) => filter.toUpperCase() === profile.seniority.toUpperCase(),
    )
  }

// TODO: implement filter by location (cities and countreis should be implemented )
export const filterByLocation =
  (locationFilter: string[]) => (profile: ProfileModel) => {
    if (!locationFilter) return true
    return locationFilter.some((location) => profile.country.name === location)
  }

export const filterByTechnology =
  (technologyFilter: string[]) => (profile: ProfileModel) => {
    if (!technologyFilter) return true
    return technologyFilter.some(
      (techFilter) =>
        !!profile.techStack.find(
          (tech) => tech.name.toUpperCase() === techFilter.toUpperCase(),
        ),
    )
  }

export const filterByAvailability =
  (availabilityFilter: string[]) => (profile: ProfileModel) => {
    if (!availabilityFilter) return true
    return availabilityFilter.some(
      (availability) =>
        !!profile.employmentTypes.find(
          (employmentType) =>
            employmentType.toUpperCase() === availability.toUpperCase(),
        ),
    )
  }
