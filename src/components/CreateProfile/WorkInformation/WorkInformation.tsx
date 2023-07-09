'use client'
import React, { useState } from 'react'
import styles from './WorkInformations.module.scss'
import { DropdownBio } from '@/inputs/Dropdowns/DropdownBio/DropdownBio'
import TextArea from '@/inputs/TextArea/TextArea'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'

const WorkInformation = () => {
  const initialState = {
    position: [] as string[],
    seniority: [] as string[],
    employment: [] as string[],
  }
  const [filters, setFilters] = useState(initialState)
  const [techStack, setTechStack] = useState('')

  const handleTechStack = (value: string) => {
    setTechStack(value)
  }

  const handleSelect = (
    option: string,
    buttonType: keyof typeof initialState,
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

  const handleEmploymentType = (option: string): void => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      employment: prevFilters.employment.includes(option)
        ? prevFilters.employment.filter(
            (selectedOption) => selectedOption !== option,
          )
        : [...prevFilters.employment, option],
    }))
    console.log(filters)
  }

  const filterLists = {
    seniority: ['Intern', 'Junior', 'Mid', 'Senior', 'Lead / Expert'],
    position: [
      'Position 1',
      'Position 2',
      'Position 3',
      'Position 4',
      'Position 5',
    ],
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal Information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.{' '}
        </div>
      </div>

      <div className={styles.right}>
        <DropdownBio
          label="Position"
          text="Choose position"
          options={filterLists.position}
          onSelect={(option) => handleSelect(option, 'position')}
          selectedValue={filters.position}
        />
        <DropdownBio
          label="Seniority"
          text="Choose seniority"
          options={filterLists.seniority}
          onSelect={(option) => handleSelect(option, 'seniority')}
          selectedValue={filters.seniority}
        />
        <div>
          <TextArea
            label="Tech stack"
            placeholder="Start typing"
            value={techStack}
            addImportantIcon={true}
            onChange={handleTechStack}
          />
          <div className={styles.addInfo}>
            Start typing and separate technologies with comas.
            <br />
            Choose max. 8
          </div>
        </div>
        <div className={styles.employmentType}>
          Employment type
          <CheckboxInput
            label="Full-time"
            checked={filters.employment.includes('Full-time')}
            onChange={() => handleEmploymentType('Full-time')}
          />
          <CheckboxInput
            label="Part-time"
            checked={filters.employment.includes('Part-time')}
            onChange={() => handleEmploymentType('Part-time')}
          />
          <CheckboxInput
            label="Contract"
            checked={filters.employment.includes('Contract')}
            onChange={() => handleEmploymentType('Contract')}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
