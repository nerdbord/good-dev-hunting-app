import { ProfileWithRelations } from '@/backend/profile/profile.types'

export const filterByPosition =
  (positionFilter: string | null) => (profile: ProfileWithRelations) => {
    return !positionFilter || profile.position === positionFilter
  }

export const filterBySeniority =
  (seniorityFilter: string | null) => (profile: ProfileWithRelations) => {
    return !seniorityFilter || profile.seniority === seniorityFilter
  }

export const filterByLocation =
  (locationFilter: string | null) => (profile: ProfileWithRelations) => {
    return !locationFilter || profile.country === locationFilter
  }

export const filterByTechnology =
  (technologyFilter: string[] | null) => (profile: ProfileWithRelations) => {
    return (
      !technologyFilter ||
      technologyFilter.length === 0 ||
      technologyFilter.every((tech) => profile.technology.includes(tech))
    )
  }

export const filterByAvailability =
  (availabilityFilter: string | null) => (profile: ProfileWithRelations) => {
    return !availabilityFilter || profile.employmentType === availabilityFilter
  }
