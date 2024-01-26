'use client'
import { DropdownFilterMulti } from '@/components/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { useFilters } from '@/contexts/FilterContext'
import React, { useState } from 'react'
import { DropdownFilter } from '../Dropdowns/DropdownFilter/DropdownFilter'
import { JobSpecialization } from '../ProfileList/profile-data'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'
import styles from './Filters.module.scss'
interface State {
  technology: string
  seniority: string
  availability: string
  location: string
}

const JobOfferFilters: State = {
  technology: '',
  seniority: '',
  availability: '',
  location: '',
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
  availability: ['Full-time', 'Part-time', 'Contract'],
  location: ['Poland', 'Europe', 'Other'],
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
    locationFilter,
    setLocationFilter,
  } = useFilters()

  const handleSelect = (
    option: string,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [buttonType]: option,
    }))
    if (buttonType === 'seniority') {
      setSeniorityFilter(option)
    }
    if (buttonType === 'location') {
      setLocationFilter(option)
    }
  }
  //
  const handleButtonClick = (newStack: string) => {
    let newPos: string[]
    if (jobSpecializationFilter.includes(newStack)) {
      newPos = jobSpecializationFilter.filter((x) => x !== newStack)
    } else {
      newPos = [...jobSpecializationFilter, newStack]
    }
    setJobSpecializationFilter(newPos)
  }
  //
  const handleSelectMulti = (option: string): void => {
    let newFilters: string[]
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
          label={''}
          text={'Technology'}
          options={filterLists.technology}
          onSelect={handleSelectMulti}
          selectedValue={technologyFilter}
        />
        <DropdownFilter
          label={''}
          text={seniorityFilter || 'Seniority'}
          options={filterLists.seniority}
          onSelect={(option) => handleSelect(option, 'seniority')}
          selectedValue={filters.seniority}
        />
        <DropdownFilter
          label={''}
          text={'Availability'}
          options={filterLists.availability}
          onSelect={(option) => handleSelect(option, 'availability')}
          selectedValue={filters.availability}
        />
        <DropdownFilter
          label={''}
          text={locationFilter || 'Location'}
          options={filterLists.location}
          onSelect={(option) => handleSelect(option, 'location')}
          selectedValue={filters.location}
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
