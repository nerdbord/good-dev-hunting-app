'use client'
import { JobSpecialization, ProfileModel } from '@/app/(profile)/types'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import {
  FilterOption,
  JobOfferFilters,
  JobOfferFiltersEnum,
  filterLists,
  useFilters,
} from '@/contexts/FilterContext'
import { PlausibleEvents } from '@/lib/plausible'
import { usePlausible } from 'next-plausible'
import React from 'react'
import { DropdownOption } from '../../../../components/Dropdowns/DropdownFilter/DropdownFilter'
import {
  filterByAvailability,
  filterByLocation,
  filterBySeniority,
  filterByTechnology,
} from '../ProfileList/filters'

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

  const handleSpecializationSelect = (option: FilterOption) => {
    const isAlreadySelected = jobSpecializationFilter.find(
      (o) => o.value === option.value,
    )
    if (isAlreadySelected) {
      setJobSpecializationFilter([])
    } else {
      setJobSpecializationFilter([option])
    }
  }

  const calculateSpecializationCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {}
    props.specializations.forEach((spec) => {
      const filteredProfiles = props.data
        .filter((profile) => profile.position === spec.value)
        .filter(filterBySeniority(seniorityFilter))
        .filter(filterByLocation(locationFilter))
        .filter(filterByTechnology(technologyFilter))
        .filter(filterByAvailability(availabilityFilter))
      counts[spec.value] = filteredProfiles.length
    })
    return counts
  }

  const handleAllSpecializationsClick = () => {
    setJobSpecializationFilter([])
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
        plausible(PlausibleEvents.SelectSeniorityFilter, {
          props: { seniority: option.value },
        })
        break
      case JobOfferFiltersEnum.availability:
        newFilters = manageFilter(availabilityFilter)
        setAvailabilityFilter(newFilters)
        plausible(PlausibleEvents.SelectAvailabilityFilter, {
          props: { availability: option.value },
        })
        break
      case JobOfferFiltersEnum.location:
        newFilters = manageFilter(locationFilter)
        setLocationFilter(newFilters)
        plausible(PlausibleEvents.SelectLocationFilter, {
          props: { location: option.value },
        })
        break
      case JobOfferFiltersEnum.technology:
        newFilters = manageFilter(technologyFilter)
        setTechnologyFilter(newFilters)
        plausible(PlausibleEvents.SelectTechnologyFilter, {
          props: { technology: option.value },
        })
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
  const allTabColors =
    jobSpecializationFilter.length === 0 ? '#13CBAA' : '#3d434b'
  const specializationCounts = calculateSpecializationCounts()
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.features}>
          <DropdownFilterMulti
            text={'Technology'}
            options={props.technologies}
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
            options={props.countries}
            onSelect={(option) =>
              handleSelectMulti(option, JobOfferFiltersEnum.location)
            }
            selectedValue={locationFilter}
          />
        </div>
        <div className={styles.devType}></div>
      </div>

      <div className={styles.tabs}>
        <SpecializationTab
          onClick={handleAllSpecializationsClick}
          isPressed={jobSpecializationFilter.length === 0}
          count={props.data.length}
          color={allTabColors}
        >
          All
        </SpecializationTab>
        {props.specializations.map((spec) => {
          const color = jobSpecializationThemes[spec.value as JobSpecialization]
          return (
            <SpecializationTab
              key={spec.value}
              onClick={() => handleSpecializationSelect(spec)}
              isPressed={jobSpecializationFilter.includes(spec)}
              count={specializationCounts[spec.value] || 0}
              color={color}
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
