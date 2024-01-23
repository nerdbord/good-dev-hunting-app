import { ProfileModelSimplified } from '@/data/frontend/profile/types'

export const filterByPosition =
  (positionFilter: string | null) => (profile: ProfileModelSimplified) => {
    return !positionFilter || profile.position === positionFilter
  }

export const filterBySeniority =
  (seniorityFilter: string[] | null) => (profile: ProfileModelSimplified) => {
    return (
      !seniorityFilter ||
      seniorityFilter.length === 0 ||
      seniorityFilter.includes(profile.seniority)
    )
  }

export const filterByLocation =
  (locationFilter: string[] | null) => (profile: ProfileModelSimplified) => {
    return (
      !locationFilter ||
      locationFilter.length === 0 ||
      locationFilter.includes(profile.country.name)
    )
  }

export const filterByTechnology =
  (technologyFilter: string[] | null) => (profile: ProfileModelSimplified) => {
    return (
      !technologyFilter ||
      technologyFilter.length === 0 ||
      technologyFilter.every((tech) => profile.techStack.includes(tech))
    )
  }

export const filterByAvailability =
  (availabilityFilter: string[] | null) =>
  (profile: ProfileModelSimplified) => {
    return (
      !availabilityFilter ||
      availabilityFilter.length === 0 ||
      availabilityFilter.includes(profile.employmentType)
    )
  }
