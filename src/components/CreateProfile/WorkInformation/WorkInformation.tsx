'use client'
import React, { useState } from 'react'
import styles from './WorkInformations.module.scss'
import { DropdownBio } from '@/inputs/Dropdowns/DropdownBio/DropdownBio'
import TextArea from '@/inputs/TextArea/TextArea'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import { FormValues } from '@/services/formService'

interface State {
  position: string[]
  seniority: string[]
  employment: string[]
}

const WorkInfoFilters: State = {
  position: [],
  seniority: [],
  employment: [],
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

const WorkInformation = () => {
  const { values, handleChange, errors } = useFormikContext<FormValues>()
  const [filters, setFilters] = useState(WorkInfoFilters)

  const handleSelectDropdownBio = (option: string) => {
    handleChange({
      target: {
        name: 'position',
        value: option,
      },
    })
  }

  const handleEmploymentType = (option: string): void => {
    setFilters((prevFilters) => {
      const newEmployment = prevFilters.employment.includes(option)
        ? prevFilters.employment.filter(
            (selectedOption) => selectedOption !== option,
          )
        : [...prevFilters.employment, option]

      handleChange({
        target: {
          name: 'employment',
          value: newEmployment,
        },
      })

      return {
        ...prevFilters,
        employment: newEmployment,
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal Information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.
        </div>
      </div>

      <div className={styles.right}>
        <div className={errors.position ? styles.errorMsg : ''}>
          <DropdownBio
            label="Position"
            text="Choose position"
            options={filterLists.position}
            onChange={handleSelectDropdownBio}
            selectedValue={filters.position}
            name="position"
          />
          <p>{errors.position as string}</p>
        </div>
        <div className={errors.seniority ? styles.errorMsg : ''}>
          <DropdownBio
            label="Seniority"
            text="Choose seniority"
            options={filterLists.seniority}
            onSelect={handleChange}
            selectedValue={filters.seniority}
            name="seniority"
          />
          <p>{errors.seniority as string}</p>
        </div>
        <div>
          <div className={errors.techStack ? styles.errorMsg : ''}>
            <TextArea
              label="Tech stack"
              placeholder="Start typing"
              value={values.techStack}
              addImportantIcon={true}
              onChange={handleChange}
              name="techStack"
            />
            <p>{errors.techStack as string}</p>
          </div>
          <div className={styles.addInfo}>
            Start typing and separate technologies with commas.
            <br />
            Choose max. 8
          </div>
        </div>
        <div className={errors.employment ? styles.errorMsg : ''}>
          Employment type
          <CheckboxInput
            label="Full-time"
            checked={filters.employment.includes('Full-time')}
            onChange={() => handleEmploymentType('Full-time')}
            name="fulltime"
          />
          <CheckboxInput
            label="Part-time"
            checked={filters.employment.includes('Part-time')}
            onChange={() => handleEmploymentType('Part-time')}
            name="parttime"
          />
          <CheckboxInput
            label="Contract"
            checked={filters.employment.includes('Contract')}
            onChange={() => handleEmploymentType('Contract')}
            name="contract"
          />
          <p>{errors.employment as string}</p>
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
