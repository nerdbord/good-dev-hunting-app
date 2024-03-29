import { type ProfileModel } from '@/app/(profile)/types'

export const filterByPosition =
  (positionFilter: string[]) => (profile: ProfileModel) => {
    if (!positionFilter.length) return true
    return positionFilter.some(
      (pos) => profile.position.toUpperCase() === pos.toUpperCase(),
    )
  }

export const filterBySeniority =
  (seniorityFilter: string[]) => (profile: ProfileModel) => {
    if (!seniorityFilter.length) return true
    return seniorityFilter.some(
      (filter) => filter.toUpperCase() === profile.seniority.toUpperCase(),
    )
  }

export const filterBySpecialization =
  (specializations: string[]) => (profile: ProfileModel) => {
    if (!specializations.length) return true
    return specializations.some(
      (filter) => filter.toUpperCase() === profile.position.toUpperCase(),
    )
  }

// TODO: implement filter by location (cities and countreis should be implemented )
export const filterByLocation =
  (locationFilter: string[]) => (profile: ProfileModel) => {
    if (!locationFilter.length) return true
    return locationFilter.some((location) => profile.country.name === location)
  }

export const filterByTechnology =
  (technologyFilter: string[]) => (profile: ProfileModel) => {
    if (!technologyFilter.length) return true
    return technologyFilter.some(
      (techFilter) =>
        !!profile.techStack.find(
          (tech) => tech.name.toUpperCase() === techFilter.toUpperCase(),
        ),
    )
  }

export const filterByAvailability =
  (availabilityFilter: string[]) => (profile: ProfileModel) => {
    if (!availabilityFilter.length) return true
    return availabilityFilter.some(
      (availability) =>
        !!profile.employmentTypes.find(
          (employmentType) =>
            employmentType.toUpperCase() === availability.toUpperCase(),
        ),
    )
  }

export const filterByFullName = (searchTermFilter: string) => {
  return (profile: ProfileModel) => {
    if (!searchTermFilter) return true
    return profile.fullName
      .toUpperCase()
      .includes(searchTermFilter.toUpperCase())
  }
}
