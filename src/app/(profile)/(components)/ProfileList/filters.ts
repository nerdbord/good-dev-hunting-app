import { type ProfileModel } from '@/app/(profile)/_models/profile.model'

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
    return locationFilter.some((location) => profile.country === location)
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

export const filterBySalary =
  (salaryFilter: string[]) => (profile: ProfileModel) => {
    if (salaryFilter.length === 0) return true

    return salaryFilter.some((salaryRange) => {
      const [min, max] = salaryRange
        .split('-')
        .map((str) => (str === 'null' ? Infinity : Number(str)))
      if (profile.hourlyRateMax === 0 && profile.hourlyRateMin === 350) {
        return min >= 350
      }
      if (profile.hourlyRateMin === 0 && profile.hourlyRateMax === 0) {
        return false
      }
      return profile.hourlyRateMin >= min && profile.hourlyRateMax <= max
    })
  }
