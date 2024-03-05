'use client'
import { JobSpecialization, ProfileModel } from '@/app/(profile)/types'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import {
  FilterOption,
  JobOfferFiltersEnum,
  filterLists,
  useFilters,
} from '@/contexts/FilterContext'
import { usePlausible } from 'next-plausible'
import React from 'react'

import { jobSpecializationThemes } from '../../helpers'
import styles from './Filters.module.scss'
import { SpecializationTab } from './SpecializationsTabs/SpecializationTabs/SpecializationTab'

interface FiltersProps {
  technologies: FilterOption[]
  countries: FilterOption[]
  specializations: FilterOption[]
  data: ProfileModel[]
}

const Filters: React.FC<FiltersProps> = (props: FiltersProps) => {
  const plausible = usePlausible()
  const { setJobSpecializationFilter, jobSpecializationFilter } = useFilters()

  const handleSpecializationSelect = (option: FilterOption) => {
    const isAlreadySelected = jobSpecializationFilter.find(
      (o) => o.value === option.value,
    )
    if (isAlreadySelected) {
      setJobSpecializationFilter([])
    } else {
      setJobSpecializationFilter([option])
    }

    // router.push(`${pathname}?${createQueryString('position', option.value)}`)
  }

  // const calculateSpecializationCounts = (): Record<string, number> => {
  //   const counts: Record<string, number> = {}
  //   props.specializations.forEach((spec) => {
  //     const filteredProfiles = props.data
  //       .filter((profile) => profile.position === spec.value)
  //       .filter(filterBySeniority(seniorityFilter))
  //       .filter(filterByLocation(locationFilter))
  //       .filter(filterByTechnology(technologyFilter))
  //       .filter(filterByAvailability(availabilityFilter))
  //     counts[spec.value] = filteredProfiles.length
  //   })
  //   return counts
  // }

  // const calculateFilteredProfilesCount = () => {
  //   return props.data
  //     .filter(filterBySeniority(seniorityFilter))
  //     .filter(filterByLocation(locationFilter))
  //     .filter(filterByTechnology(technologyFilter))
  //     .filter(filterByAvailability(availabilityFilter)).length
  // }

  const handleAllSpecializationsClick = () => {
    setJobSpecializationFilter([])
  }

  const allTabColors =
    jobSpecializationFilter.length === 0 ? '#13CBAA' : '#3d434b'
  // const filteredProfilesCount = calculateFilteredProfilesCount()
  // const specializationCounts = calculateSpecializationCounts()

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.features}>
          <DropdownFilterMulti
            text={'Technology'}
            options={props.technologies}
            jobOfferFilterName={JobOfferFiltersEnum.technology}
            hasSearchInput
          />
          <DropdownFilterMulti
            text={'Seniority'}
            options={filterLists.seniority}
            jobOfferFilterName={JobOfferFiltersEnum.seniority}
          />
          <DropdownFilterMulti
            text={'Availability'}
            options={filterLists.availability}
            jobOfferFilterName={JobOfferFiltersEnum.availability}
          />
          <DropdownFilterMulti
            text={'Location'}
            options={props.countries}
            jobOfferFilterName={JobOfferFiltersEnum.location}
          />
        </div>
        <div className={styles.devType}></div>
      </div>

      <div className={styles.tabs}>
        <SpecializationTab
          // onClick={handleAllSpecializationsClick}
          // isPressed={jobSpecializationFilter.length === 0}
          // count={filteredProfilesCount}
          // color={allTabColors}
          name="all"
        >
          All
        </SpecializationTab>
        {props.specializations.map((spec) => {
          const color = jobSpecializationThemes[spec.value as JobSpecialization]
          return (
            <SpecializationTab
              key={spec.value}
              name={spec.value}
              // onClick={() => handleSpecializationSelect(spec)}
              // isPressed={jobSpecializationFilter.includes(spec)}
              // count={specializationCounts[spec.value] || 0}
              // color={color}
            >
              {spec.name}
            </SpecializationTab>
          )
        })}
      </div>
    </>
  )
}

export default Filters
