'use client'
import React from 'react'
import styles from './WorkInformations.module.scss'
import { DropdownBio } from '@/inputs/Dropdowns/DropdownBio/DropdownBio'
import TextArea from '@/inputs/TextArea/TextArea'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import { FormValues } from '@/services/create-profile-form-service'
import InputFormError from '@/components/CreateProfileForm/InputErrorWrapper'

const filterLists = {
  seniority: ['Intern', 'Junior', 'Mid', 'Senior'],
  position: ['Frontend', 'Backend', 'Fullstack'],
}

const WorkInformation = () => {
  const { values, handleChange, errors, setFieldValue } =
    useFormikContext<FormValues>()

  const handleEmploymentType = (option: string): void => {
    const newEmployment = values.employment.includes(option)
      ? values.employment.filter((selectedOption) => selectedOption !== option)
      : [...values.employment, option]

    setFieldValue('employment', newEmployment)
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
        <div>
          <InputFormError error={errors.techStack}>
            <TextArea
              label="Tech stack"
              placeholder="Start typing"
              value={values.techStack}
              addImportantIcon={true}
              onChange={handleChange}
              name="techStack"
            />
          </InputFormError>
          <div className={styles.addInfo}>
            Start typing and separate technologies with commas.
            <br />
            Choose max. 8
          </div>
        </div>
        <InputFormError error={errors.employment}>
          Employment type
          <CheckboxInput
            id="fulltime"
            label="Full-time"
            checked={values.employment.includes('Full-time')}
            onChange={() => handleEmploymentType('Full-time')}
            name="fulltime"
          />
          <CheckboxInput
            id="parttime"
            label="Part-time"
            checked={values.employment.includes('Part-time')}
            onChange={() => handleEmploymentType('Part-time')}
            name="parttime"
          />
          <CheckboxInput
            id="contract"
            label="Contract"
            checked={values.employment.includes('Contract')}
            onChange={() => handleEmploymentType('Contract')}
            name="contract"
          />
        </InputFormError>
      </div>
    </div>
  )
}

export default WorkInformation
