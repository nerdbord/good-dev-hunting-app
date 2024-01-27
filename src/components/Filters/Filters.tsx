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
import { DropdownOption } from '../Dropdowns/DropdownFilter/DropdownFilter'
import AsyncDropdownFilterMulti from '../Dropdowns/DropdownFilterMulti/AsyncDropdownFilterMulti'
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

  const handleButtonClick = (newStack: DropdownOption) => {
    let newPos: DropdownOption[]
    if (jobSpecializationFilter.includes(newStack)) {
      newPos = jobSpecializationFilter.filter((x) => x !== newStack)
    } else {
      newPos = [...jobSpecializationFilter, newStack]
    }
    setJobSpecializationFilter(newPos)
  }

  const handleSelectMulti = (
    option: DropdownOption,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    let newFilters

    switch (buttonType) {
      case JobOfferFiltersEnum.seniority:
        newFilters = manageFilter(seniorityFilter)
        setSeniorityFilter(newFilters)
        break
      case JobOfferFiltersEnum.availability:
        newFilters = manageFilter(availabilityFilter)
        setAvailabilityFilter(newFilters)
        break
      case JobOfferFiltersEnum.location:
        newFilters = manageFilter(locationFilter)
        setLocationFilter(newFilters)
        break
      case JobOfferFiltersEnum.technology:
        newFilters = manageFilter(technologyFilter)
        setTechnologyFilter(newFilters)
        break
      default:
        return
    }

    function manageFilter(filterList: DropdownOption[]): DropdownOption[] {
      const filteredList = filterList.filter((filter) => filter !== option)
      if (filteredList.length === filterList.length) {
        filteredList.push(option)
      }
      return filteredList
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <AsyncDropdownFilterMulti
          text={'Technology'}
          options={filterLists.technology}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFiltersEnum.technology)
          }
          selectedValue={technologyFilter}
        />
        <DropdownFilterMulti
          text={'Seniority'}
          options={filterLists.seniority}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFiltersEnum.seniority)
          }
          selectedValue={seniorityFilter}
        />
        <DropdownFilterMulti
          text={'Availability'}
          options={filterLists.availability}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFiltersEnum.availability)
          }
          selectedValue={availabilityFilter}
        />
        <DropdownFilterMulti
          text={'Location'}
          options={filterLists.location}
          onSelect={(option) =>
            handleSelectMulti(option, JobOfferFiltersEnum.location)
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
