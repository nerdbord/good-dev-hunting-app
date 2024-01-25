'use client'
import React, { useState, useEffect } from 'react'
import { DropdownSelect } from '@/components/Dropdowns/DropdownBio/DropdownSelect'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/InputFormError/InputFormError'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { EmploymentType } from '@prisma/client'
import styles from './WorkInformations.module.scss'
import technologies from '../../../data/frontend/technologies/data'
import { mappedSeniorityLevel } from '@/data/frontend/profile/mappers'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import { TechStackInput } from '@/components/TechStackInput/TechStackInput'

export enum WorkInformationFormKeys {
  POSITION = 'position',
  SENIORITY = 'seniority',
  TECH_STACK = 'techStack',
  EMPLOYMENT = 'employment',
}

const WorkInformation = () => {
  const { values, errors, setFieldValue, touched } =
    useFormikContext<CreateProfileFormValues>()

  const handleEmploymentType = (option: string): void => {
    setFieldValue(WorkInformationFormKeys.EMPLOYMENT, option)
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
            label="Position"
            text="Choose position"
            options={mappedSeniorityLevel}
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
          /* TODO: Fix it */
          // error={
          //   touched[WorkInformationFormKeys.TECH_STACK] &&
          //   errors[WorkInformationFormKeys.TECH_STACK]
          // }
          error={''}
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
          Choose max. 8
        </div>
        <div className={styles.employmentType}>
          Employment type
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT}
            label="Full-time"
            checked={
              values[WorkInformationFormKeys.EMPLOYMENT] ===
              EmploymentType.FULL_TIME
            }
            onChange={() => handleEmploymentType(EmploymentType.FULL_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT}
            label="Part-time"
            checked={
              values[WorkInformationFormKeys.EMPLOYMENT] ===
              EmploymentType.PART_TIME
            }
            onChange={() => handleEmploymentType(EmploymentType.PART_TIME)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
          <CheckboxInput
            id={WorkInformationFormKeys.EMPLOYMENT}
            label="Contract"
            checked={
              values[WorkInformationFormKeys.EMPLOYMENT] ===
              EmploymentType.CONTRACT
            }
            onChange={() => handleEmploymentType(EmploymentType.CONTRACT)}
            name={WorkInformationFormKeys.EMPLOYMENT}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
