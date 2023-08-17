import {
  ProfilePayload,
  ProfileWithRelations,
} from '@/backend/profile/profile.types'

export const filterByPosition =
  (positionFilter: string | null) => (profile: ProfilePayload) => {
    return !positionFilter || profile.position === positionFilter
  }

export const filterBySeniority =
  (seniorityFilter: string | null) => (profile: ProfilePayload) => {
    return !seniorityFilter || profile.seniority === seniorityFilter
  }

export const filterByLocation =
  (locationFilter: string | null) => (profile: ProfilePayload) => {
    return !locationFilter || profile.country.name === locationFilter
  }

export const filterByTechnology =
  (technologyFilter: string[] | null) => (profile: ProfilePayload) => {
    return (
      !technologyFilter ||
      technologyFilter.length === 0 ||
      technologyFilter.every((tech) => profile.techStack.includes(tech))
    )
  }

export const filterByAvailability =
  (availabilityFilter: string | null) => (profile: ProfilePayload) => {
    return !availabilityFilter || profile.employmentType === availabilityFilter
  }
