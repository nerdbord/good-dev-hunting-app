'use client'
import {
  mappedSeniorityLevel,
  mappedSpecialization,
} from '@/app/(profile)/mappers'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import { DropdownSelect } from '@/components/Dropdowns/DropdownBio/DropdownSelect'

import InputFormError from '@/components/InputFormError/InputFormError'
import { TechStackInput } from '@/components/TechStackInput/TechStackInput'
import { EmploymentType } from '@prisma/client'
import { useFormikContext } from 'formik'

import { type CreateProfileFormValues } from '@/app/(profile)/types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import styles from './WorkInformations.module.scss'

export enum WorkInformationFormKeys {
  POSITION = 'position',
  SENIORITY = 'seniority',
  TECH_STACK = 'techStack',
  EMPLOYMENT = 'employment',
}

const WorkInformation = () => {
  const { values, errors, setFieldValue, touched } =
    useFormikContext<CreateProfileFormValues>()

  const handleEmploymentType = (option: EmploymentType): void => {
    let newFilters: string[]
    if (values.employment.includes(option)) {
      newFilters = values.employment.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      newFilters = [...values.employment, option]
    }
    setFieldValue(WorkInformationFormKeys.EMPLOYMENT, newFilters)
  }

  const handleTechSelect = (tech: DropdownOption) => {
    if (!values[WorkInformationFormKeys.TECH_STACK].includes(tech)) {
      setFieldValue(WorkInformationFormKeys.TECH_STACK, [
        ...values[WorkInformationFormKeys.TECH_STACK],
        tech,
      ])
    }
  }

  const handleTechRemove = (techToRemove: DropdownOption) => {
    if (Array.isArray(values[WorkInformationFormKeys.TECH_STACK])) {
      setFieldValue(
        WorkInformationFormKeys.TECH_STACK,
        values[WorkInformationFormKeys.TECH_STACK].filter(
          (tech) => tech.value !== techToRemove.value,
        ),
      )
    }
  }

  const isEmploymentTypeSelected = (option: EmploymentType): boolean => {
    return values.employment.includes(option)
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
        <InputFormError
          error={
            touched[WorkInformationFormKeys.POSITION] &&
            errors[WorkInformationFormKeys.POSITION]?.value
          }
        >
          <DropdownSelect
            id={WorkInformationFormKeys.POSITION}
            label="Specialization"
            text="Choose your primary specialization"
            options={mappedSpecialization}
            selectedValue={values[WorkInformationFormKeys.POSITION]}
            name={WorkInformationFormKeys.POSITION}
          />
        </InputFormError>
        <InputFormError
          error={
            touched[WorkInformationFormKeys.SENIORITY] &&
            errors[WorkInformationFormKeys.SENIORITY]?.value
          }
        >
          <DropdownSelect
            id={WorkInformationFormKeys.SENIORITY}
            label="Seniority"
            text="Choose seniority"
            options={mappedSeniorityLevel}
            selectedValue={values[WorkInformationFormKeys.SENIORITY]}
            name={WorkInformationFormKeys.SENIORITY}
          />
        </InputFormError>
        <InputFormError
          error={
            touched[WorkInformationFormKeys.TECH_STACK] &&
            ((errors[WorkInformationFormKeys.TECH_STACK] as string) || '')
          }
        >
          <TechStackInput
            chips={values[WorkInformationFormKeys.TECH_STACK]}
            label="Tech stack"
            placeholder="Start typing"
            name={WorkInformationFormKeys.TECH_STACK}
            onTechSelect={handleTechSelect}
            onTechRemove={handleTechRemove}
            addImportantIcon={true}
            tooltipText="List the technologies you are comfortable with or interested in."
          />
        </InputFormError>
        <div className={styles.addInfo}>
          Start typing and separate technologies with commas.
          <br />
          Choose max. 16
        </div>
        <div className={styles.employmentType}>
          Employment type
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 1}
            label="Full-time"
            checked={isEmploymentTypeSelected(EmploymentType.FULL_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.FULL_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 2}
            label="Part-time"
            checked={isEmploymentTypeSelected(EmploymentType.PART_TIME)}
            onChange={() => handleEmploymentType(EmploymentType.PART_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT + 3}
            label="Contract"
            checked={isEmploymentTypeSelected(EmploymentType.CONTRACT)}
            onChange={() => handleEmploymentType(EmploymentType.CONTRACT)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
