'use client'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { useFilters } from '@/contexts/FilterContext'
import React from 'react'
import { JobSpecialization } from '../ProfileList/profile-data'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'
import styles from './Filters.module.scss'

enum JobOfferFilters {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
}

const filterLists = {
  technology: [
    'Javascript',
    'Python',
    'Node.js',
    'React.js',
    'Vue.js',
    'Angular',
    'MongoDB',
  ],
  seniority: ['Intern', 'Junior', 'Mid', 'Senior', 'Lead / Expert'],
  // z dużych liter działa, bez nie! Trzeba to jakoś przebudować!
  availability: ['Full-time', 'Part-time', 'CONTRACT'],
  location: ['Poland', 'Europe', 'Other'],
}

const Filters: React.FC = () => {
  const {
    setJobSpecializationFilter,
    jobSpecializationFilter,
    technologyFilter,
    setTechnologyFilter,
    seniorityFilter,
    setSeniorityFilter,
    availabilityFilter,
    setAvailabilityFilter,
    locationFilter,
    setLocationFilter,
  } = useFilters()

  const handleButtonClick = (newStack: string) => {
    let newPos: string[]
    if (jobSpecializationFilter.includes(newStack)) {
      newPos = jobSpecializationFilter.filter((x) => x !== newStack)
    } else {
      newPos = [...jobSpecializationFilter, newStack]
    }
    setJobSpecializationFilter(newPos)
  }

  const handleSelectMulti = (
    option: string,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    if (buttonType === JobOfferFilters.seniority) {
      const newFilters = manageFilter(seniorityFilter)
      setSeniorityFilter(newFilters)
    }
    if (buttonType === JobOfferFilters.availability) {
      const newFilters = manageFilter(availabilityFilter)
      setAvailabilityFilter(newFilters)
    }
    if (buttonType === JobOfferFilters.location) {
      const newFilters = manageFilter(locationFilter)
      setLocationFilter(newFilters)
    }
    if (buttonType === JobOfferFilters.technology) {
      const newFilters = manageFilter(technologyFilter)
      setTechnologyFilter(newFilters)
    }

    function manageFilter(filterList: string[]): string[] {
      if (filterList.includes(option)) {
        return filterList.filter((selectedOption) => selectedOption !== option)
      } else {
        return [...filterList, option]
      }
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <DropdownFilterMulti
          label={''}
          text={'Technology'}
          options={filterLists.technology}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFilters.technology)
          }
          selectedValue={technologyFilter}
        />
        <DropdownFilterMulti
          label={''}
          text={'Seniority'}
          options={filterLists.seniority}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFilters.seniority)
          }
          selectedValue={seniorityFilter}
        />
        <DropdownFilterMulti
          label={''}
          text={'Availability'}
          options={filterLists.availability}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFilters.availability)
          }
          selectedValue={availabilityFilter}
        />
        <DropdownFilterMulti
          label={''}
          text={'Location'}
          options={filterLists.location}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFilters.location)
          }
          selectedValue={locationFilter}
        />
      </div>
      <div className={styles.devType}>
        <DevTypeButton
          variant={JobSpecialization.Frontend}
          onClick={() => handleButtonClick(JobSpecialization.Frontend)}
          isPressed={jobSpecializationFilter.includes(
            JobSpecialization.Frontend,
          )}
        >
          Frontend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Backend}
          onClick={() => handleButtonClick(JobSpecialization.Backend)}
          isPressed={jobSpecializationFilter.includes(
            JobSpecialization.Backend,
          )}
        >
          Backend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Fullstack}
          onClick={() => handleButtonClick(JobSpecialization.Fullstack)}
          isPressed={jobSpecializationFilter.includes(
            JobSpecialization.Fullstack,
          )}
        >
          Fullstack
        </DevTypeButton>
      </div>
    </div>
  )
}

export default Filters
