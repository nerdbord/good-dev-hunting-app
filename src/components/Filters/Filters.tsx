'use client'
import React, { useState } from 'react'
import styles from './Filters.module.scss'
import { DropdownFilter } from '../../inputs/Dropdowns/DropdownFilter/DropdownFilter'
import { DevTypeButton } from './Buttons/DevTypeButton/DevTypeButton'

interface State {
  technology: string[]
  seniority: string[]
  availability: string[]
  location: string[]
}

const JobOfferFilters: State = {
  technology: [],
  seniority: [],
  availability: [],
  location: [],
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

  const handleSelect = (
    option: string,
    buttonType: keyof typeof JobOfferFilters,
  ): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [buttonType]: prevFilters[buttonType].includes(option)
        ? prevFilters[buttonType].filter(
            (selectedOption) => selectedOption !== option,
          )
        : [...prevFilters[buttonType], option],
    }))
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <DropdownFilter
          label={''}
          text="Technology"
          options={filterLists.technology}
          onSelect={(option) => handleSelect(option, 'technology')}
          selectedValue={filters.technology}
        />
        <DropdownFilter
          label={''}
          text="Seniority"
          options={filterLists.seniority}
          onSelect={(option) => handleSelect(option, 'seniority')}
          selectedValue={filters.seniority}
        />
        <DropdownFilter
          label={''}
          text="Availability"
          options={filterLists.availability}
          onSelect={(option) => handleSelect(option, 'availability')}
          selectedValue={filters.availability}
        />

        <DropdownFilter
          label={''}
          text="Location"
          options={filterLists.location}
          onSelect={(option) => handleSelect(option, 'location')}
          selectedValue={filters.location}
        />
      </div>
      <div className={styles.devType}>
        <DevTypeButton
          variant="frontend"
          onClick={() => console.log('frontend')}
        >
          Frontend
        </DevTypeButton>
        <DevTypeButton variant="backend" onClick={() => console.log('backend')}>
          Backend
        </DevTypeButton>
        <DevTypeButton
          variant="fullstack"
          onClick={() => console.log('fullstack')}
        >
          Fullstack
        </DevTypeButton>
      </div>
    </div>
  )
}

export default Filters
