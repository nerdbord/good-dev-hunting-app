'use client'
import React, { useState } from 'react'
import styles from './Filters.module.scss'
import {
  DropdownFilter,
  DropdownOption,
} from '../Dropdowns/DropdownFilter/DropdownFilter'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'
import { initialDropdownOption, useFilters } from '@/contexts/FilterContext'
import {
  mappedEmploymentType,
  mappedLocations,
  mappedSeniorityLevel,
  mappedTechnologies,
} from '@/data/frontend/profile/mappers'
import { JobSpecialization } from '@/data/frontend/profile/types'
interface State {
  technology: DropdownOption
  seniority: DropdownOption
  availability: DropdownOption
  location: DropdownOption
}

export enum JobOfferFiltersEnum {
  technology = 'technology',
  seniority = 'seniority',
  availability = 'availability',
  location = 'location',
}

const JobOfferFilters: State = {
  technology: initialDropdownOption,
  seniority: initialDropdownOption,
  availability: initialDropdownOption,
  location: initialDropdownOption,
}

const jobSpecializationOptions: Record<JobSpecialization, DropdownOption> = {
  [JobSpecialization.Frontend]: {
    name: 'Frontend',
    value: JobSpecialization.Frontend,
  },
  [JobSpecialization.Backend]: {
    name: 'Backend',
    value: JobSpecialization.Backend,
  },
  [JobSpecialization.Fullstack]: {
    name: 'Fullstack',
    value: JobSpecialization.Fullstack,
  },
}

type FiltersLists = {
  [key in JobOfferFiltersEnum]: DropdownOption[]
}

const filterLists: FiltersLists = {
  technology: mappedTechnologies,
  seniority: mappedSeniorityLevel,
  availability: mappedEmploymentType,
  location: mappedLocations,
}

const Filters: React.FC = () => {
  const [filters, setFilters] = useState(JobOfferFilters)
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

  const handleSelect = (
    option: DropdownOption,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [buttonType]: option,
    }))

    switch (buttonType) {
      case JobOfferFiltersEnum.seniority:
        setSeniorityFilter(option)
        break
      case JobOfferFiltersEnum.availability:
        setAvailabilityFilter(option)
        break
      case JobOfferFiltersEnum.location:
        setLocationFilter(option)
        break
      default:
        break
    }
  }
  //
  const handleButtonClick = (newStack: DropdownOption) => {
    let newPos: DropdownOption[]
    if (jobSpecializationFilter.includes(newStack)) {
      newPos = jobSpecializationFilter.filter((x) => x !== newStack)
    } else {
      newPos = [...jobSpecializationFilter, newStack]
    }
    setJobSpecializationFilter(newPos)
  }
  //
  const handleSelectMulti = (option: DropdownOption): void => {
    let newFilters: DropdownOption[]
    if (technologyFilter.includes(option)) {
      newFilters = technologyFilter.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      newFilters = [...technologyFilter, option]
    }
    setTechnologyFilter(newFilters)
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <DropdownFilterMulti
          text={'Technology'}
          options={filterLists.technology}
          onSelect={handleSelectMulti}
          selectedValue={technologyFilter}
        />
        <DropdownFilter
          text={seniorityFilter.name || 'Seniority'}
          options={filterLists.seniority}
          onSelect={(option) =>
            handleSelect(option, JobOfferFiltersEnum.seniority)
          }
          selectedValue={filters.seniority}
        />
        <DropdownFilter
          text={availabilityFilter.name || 'Availability'}
          options={filterLists.availability}
          onSelect={(option) =>
            handleSelect(option, JobOfferFiltersEnum.availability)
          }
          selectedValue={filters.availability}
        />
        <DropdownFilter
          text={locationFilter.name || 'Location'}
          options={filterLists.location}
          onSelect={(option) =>
            handleSelect(option, JobOfferFiltersEnum.location)
          }
          selectedValue={filters.location}
        />
      </div>
      <div className={styles.devType}>
        <DevTypeButton
          variant={JobSpecialization.Frontend}
          onClick={() =>
            handleButtonClick(
              jobSpecializationOptions[JobSpecialization.Frontend],
            )
          }
          isPressed={jobSpecializationFilter.includes(
            jobSpecializationOptions[JobSpecialization.Frontend],
          )}
        >
          Frontend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Backend}
          onClick={() =>
            handleButtonClick(
              jobSpecializationOptions[JobSpecialization.Backend],
            )
          }
          isPressed={jobSpecializationFilter.includes(
            jobSpecializationOptions[JobSpecialization.Backend],
          )}
        >
          Backend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Fullstack}
          onClick={() =>
            handleButtonClick(
              jobSpecializationOptions[JobSpecialization.Fullstack],
            )
          }
          isPressed={jobSpecializationFilter.includes(
            jobSpecializationOptions[JobSpecialization.Fullstack],
          )}
        >
          Fullstack
        </DevTypeButton>
      </div>
    </div>
  )
}

export default Filters
