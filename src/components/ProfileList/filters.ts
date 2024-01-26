import { ProfileModel } from '@/data/frontend/profile/types'
import { EmploymentType } from '@prisma/client'

export const filterByPosition =
  (positionFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !positionFilter ||
      positionFilter.length === 0 ||
      positionFilter.some((pos) => profile.position.includes(pos))
    )
  }

export const filterBySeniority =
  (seniorityFilter: string | null) => (profile: ProfileModel) => {
    return !seniorityFilter || profile.seniority === seniorityFilter
  }

export const filterByLocation =
  (locationFilter: string | null) => (profile: ProfileModel) => {
    return !locationFilter || profile.country.name === locationFilter
  }

export const filterByTechnology =
  (technologyFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !technologyFilter ||
      technologyFilter.length === 0 ||
      technologyFilter.every((tech) => profile.techStack.includes(tech))
    )
  }

export const filterByAvailability =
  (availabilityFilter: EmploymentType[] | null) => (profile: ProfileModel) => {
    return (
      !availabilityFilter ||
      availabilityFilter.length === 0 ||
      availabilityFilter.some((availability) =>
        profile.employmentType.includes(availability),
      )
    )
  }
