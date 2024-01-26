import { FilterOption } from '@/contexts/FilterContext'
import { ProfileModel } from '@/data/frontend/profile/types'

export const filterByPosition =
  (positionFilter: FilterOption[]) => (profile: ProfileModel) => {
    if (positionFilter.length === 0) return true
    return positionFilter.some(
      (pos) => profile.position.toUpperCase() === pos.value.toUpperCase(),
    )
  }

export const filterBySeniority =
  (seniorityFilter: FilterOption) => (profile: ProfileModel) => {
    if (!seniorityFilter.value) return true
    return (
      profile.seniority.toUpperCase() === seniorityFilter.value.toUpperCase()
    )
  }

export const filterByLocation =
  (locationFilter: FilterOption) => (profile: ProfileModel) => {
    if (!locationFilter.value) return true
    return (
      profile.country.name.toUpperCase() === locationFilter.value.toUpperCase()
    )
  }

export const filterByTechnology =
  (technologyFilter: FilterOption[]) => (profile: ProfileModel) => {
    if (technologyFilter.length === 0) return true
    return technologyFilter.some(
      (techFilter) =>
        !!profile.techStack.find(
          (tech) => tech.name.toUpperCase() === techFilter.value.toUpperCase(),
        ),
    )
  }

export const filterByAvailability =
  (availabilityFilter: FilterOption[] | null) => (profile: ProfileModel) => {
    if (!availabilityFilter) return true
    return availabilityFilter.some(
      (availability) =>
        !!profile.employmentTypes.find(
          (employmentType) =>
            employmentType.toUpperCase() === availability.value.toUpperCase(),
        ),
    )
  }
