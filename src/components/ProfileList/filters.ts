import { ProfileModel } from '@/data/frontend/profile/types'

export const filterByPosition =
  (positionFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !positionFilter ||
      positionFilter.length === 0 ||
      positionFilter.some((pos) => profile.position.includes(pos))
    )
  }

export const filterBySeniority =
  (seniorityFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !seniorityFilter ||
      seniorityFilter.length === 0 ||
      seniorityFilter.includes(profile.seniority)
    )
  }

export const filterByLocation =
  (locationFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !locationFilter ||
      locationFilter.length === 0 ||
      locationFilter.includes(profile.country.name)
    )
  }

export const filterByTechnology =
  (technologyFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !technologyFilter ||
      technologyFilter.length === 0 ||
      technologyFilter.every((tech) =>
        profile.techStack.map((tech) => tech.name).includes(tech),
      )
    )
  }

export const filterByAvailability =
  (availabilityFilter: string[] | null) => (profile: ProfileModel) => {
    return (
      !availabilityFilter ||
      availabilityFilter.length === 0 ||
      availabilityFilter.includes(profile.employmentType)
    )
  }
