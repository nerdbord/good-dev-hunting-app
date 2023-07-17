import { ProfileListItems } from "./profile-data"

export const filterByStack = (stackFilter: string | null) => (profile: ProfileListItems) => {
  return !stackFilter || profile.jobSpecialization === stackFilter
}

export const filterBySeniority = (seniorityFilter: string | null) => (profile: ProfileListItems) => {
  return !seniorityFilter || profile.seniority === seniorityFilter
}

export const filterByLocation = (locationFilter: string | null) => (profile: ProfileListItems) => {
  return !locationFilter || profile.country === locationFilter
}

export const filterByTechnology = (technologyFilter: string[] | null) => (profile: ProfileListItems) => {
    return !technologyFilter || technologyFilter.length === 0 || technologyFilter.every((tech) => profile.technology.includes(tech))
  }

export const filterByAvailability = (availabilityFilter: string | null) => (profile: ProfileListItems) => {
  return !availabilityFilter || profile.employmentType === availabilityFilter
}