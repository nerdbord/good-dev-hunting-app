'use client'
import React, { useState } from 'react'
import styles from './Filters.module.scss'
import { DropdownFilter } from '../../inputs/Dropdowns/DropdownFilter/DropdownFilter'
import { DropdownFilterMulti } from '@/inputs/Dropdowns/DropdownFilterMulti/DropdownFilterMulti'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'
import { useFilters } from '@/contexts/FilterContext'
import { JobSpecialization } from '../ProfileList/profile-data'
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
  const [selectedButton, setSelectedButton] = useState<string | null>(null)
  const {
    setStackFilter,
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
    if (buttonType === 'availability') {
      setAvailabilityFilter(option)
    }
    if (buttonType === 'location') {
      setLocationFilter(option)
    }
  }

  const handleButtonClick = (newStack: string) => {
    if (newStack === selectedButton) {
      setSelectedButton(null)
      setStackFilter('')
    } else {
      setSelectedButton(newStack)
      setStackFilter(newStack)
    }
  }

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
          text={availabilityFilter || 'Availability'}
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
          isPressed={selectedButton === JobSpecialization.Frontend}
        >
          Frontend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Backend}
          onClick={() => handleButtonClick(JobSpecialization.Backend)}
          isPressed={selectedButton === JobSpecialization.Backend}
        >
          Backend
        </DevTypeButton>
        <DevTypeButton
          variant={JobSpecialization.Fullstack}
          onClick={() => handleButtonClick(JobSpecialization.Fullstack)}
          isPressed={selectedButton === JobSpecialization.Fullstack}
        >
          Fullstack
        </DevTypeButton>
      </div>
    </div>
  )
}

export default Filters
