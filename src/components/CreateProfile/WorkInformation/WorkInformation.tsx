'use client'
import React, { useState, useEffect } from 'react'
import { DropdownBio } from '@/components/Dropdowns/DropdownBio/DropdownBio'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/InputFormError/InputFormError'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { EmploymentType } from '@prisma/client'
import styles from './WorkInformations.module.scss'
import TechStackInput from '@/components/TechStackInput/TechStackInput'
import technologies from '../../../data/frontend/technologies/data'

const filterLists = {
  seniority: ['Intern', 'Junior', 'Mid', 'Senior'],
  position: ['Frontend', 'Backend', 'Fullstack'],
}

const WorkInformation = () => {
  const { values, errors, setFieldValue } =
    useFormikContext<CreateProfileFormValues>()
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleEmploymentType = (option: string): void => {
    setFieldValue('employment', option)
  }

  useEffect(() => {
    const filtered = technologies.filter((tech) =>
      tech.toLowerCase().startsWith(inputValue.toLowerCase()),
    )
    setFilteredSuggestions(filtered.slice(0, 8))
  }, [inputValue])

  const handleTechSelect = (tech: string) => {
    if (!values.techStack.includes(tech)) {
      setFieldValue('techStack', [...values.techStack, tech])
    }
    setInputValue('')
  }

  const handleTechRemove = (techToRemove: string) => {
    if (Array.isArray(values.techStack)) {
      setFieldValue(
        'techStack',
        values.techStack.filter((tech) => tech !== techToRemove),
      )
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Work information</div>
        <div className={styles.personalInfo}>
          Share your current qualifications information. You’ll be able to
          change it at any moment.
        </div>
      </div>

      <div className={styles.right}>
        <InputFormError error={errors.position}>
          <DropdownBio
            id="position"
            label="Position"
            text="Choose position"
            options={filterLists.position}
            selectedValue={values.position}
            name="position"
          />
        </InputFormError>
        <InputFormError error={errors.seniority}>
          <DropdownBio
            id="seniority"
            label="Seniority"
            text="Choose seniority"
            options={filterLists.seniority}
            selectedValue={values.seniority}
            name="seniority"
          />
        </InputFormError>
        <InputFormError error={errors.techStack}>
          <TechStackInput
            chips={values.techStack}
            inputValue={inputValue}
            setInputValue={setInputValue}
            filteredSuggestions={filteredSuggestions}
            label="Tech stack"
            placeholder="Start typing"
            name="techStack"
            onTechSelect={handleTechSelect}
            onTechRemove={handleTechRemove}
            addImportantIcon={true}
            tooltipText="List the technologies you are comfortable with or interested in."
          />
        </InputFormError>
        <div className={styles.addInfo}>
          Start typing and separate technologies with commas.
          <br />
          Choose max. 8
        </div>
        <div className={styles.employmentType}>
          <InputFormError error={errors.employment}>
            Employment type
            <CheckboxInput
              id="fulltime"
              label="Full-time"
              checked={values.employment === EmploymentType.FULL_TIME}
              onChange={() => handleEmploymentType(EmploymentType.FULL_TIME)}
              name="fulltime"
            />
            <CheckboxInput
              id="parttime"
              label="Part-time"
              checked={values.employment === EmploymentType.PART_TIME}
              onChange={() => handleEmploymentType(EmploymentType.PART_TIME)}
              name="parttime"
            />
            <CheckboxInput
              id="contract"
              label="Contract"
              checked={values.employment === EmploymentType.CONTRACT}
              onChange={() => handleEmploymentType(EmploymentType.CONTRACT)}
              name="contract"
            />
          </InputFormError>
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
