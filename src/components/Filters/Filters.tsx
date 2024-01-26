'use client'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import {
  filterLists,
  JobOfferFilters,
  JobOfferFiltersEnum,
  jobSpecializationOptions,
  useFilters,
} from '@/contexts/FilterContext'
import { JobSpecialization } from '@/data/frontend/profile/types'
import React from 'react'
import {
  DropdownFilter,
  DropdownOption,
} from '../Dropdowns/DropdownFilter/DropdownFilter'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'
import styles from './Filters.module.scss'

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

  const handleSelect = (
    option: DropdownOption,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    switch (buttonType) {
      case JobOfferFiltersEnum.seniority:
        setSeniorityFilter(option)
        break
      case JobOfferFiltersEnum.availability:
        setAvailabilityFilter([option])
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
          selectedValue={seniorityFilter}
        />
        <DropdownFilterMulti
          text={'Availability'}
          options={filterLists.availability}
          onSelect={(option) =>
            handleSelect(option, JobOfferFiltersEnum.availability)
          }
          selectedValue={availabilityFilter}
        />
        <DropdownFilter
          text={locationFilter.name || 'Location'}
          options={filterLists.location}
          onSelect={(option) =>
            handleSelect(option, JobOfferFiltersEnum.location)
          }
          selectedValue={locationFilter}
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
