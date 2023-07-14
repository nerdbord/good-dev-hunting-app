'use client'
import React from 'react'
import styles from './WorkInformations.module.scss'
import { DropdownBio } from '@/inputs/Dropdowns/DropdownBio/DropdownBio'
import TextArea from '@/inputs/TextArea/TextArea'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import { FormValues } from '@/services/CreateProfileFormService'

const filterLists = {
  seniority: ['Intern', 'Junior', 'Mid', 'Senior'],
  position: [
    'Frontend',
    'Backend',
    'Fullstack',
  ],
}

const WorkInformation = () => {
  const { values, handleChange, errors, setFieldValue } = useFormikContext<FormValues>()

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
        Share your current qualifications information. You’ll be able to change it at any moment.
        </div>
      </div>

      <div className={styles.right}>
        <div className={errors.position ? styles.errorMsg : ''}>
          <DropdownBio
            label="Position"
            text="Choose position"
            options={filterLists.position}
            selectedValue={values.position}
            name="position"
          />
          <p>{errors.position}</p>
        </div>
        <div className={errors.seniority ? styles.errorMsg : ''}>
          <DropdownBio
            label="Seniority"
            text="Choose seniority"
            options={filterLists.seniority}
            selectedValue={values.seniority}
            name="seniority"
          />
          <p>{errors.seniority}</p>
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
            <p>{errors.techStack}</p>
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
            checked={values.employment.includes('Full-time')}
            onChange={() => handleEmploymentType('Full-time')}
            name="fulltime"
          />
          <CheckboxInput
            label="Part-time"
            checked={values.employment.includes('Part-time')}
            onChange={() => handleEmploymentType('Part-time')}
            name="parttime"
          />
          <CheckboxInput
            label="Contract"
            checked={values.employment.includes('Contract')}
            onChange={() => handleEmploymentType('Contract')}
            name="contract"
          />
          <p>{errors.employment}</p>
        </div>
      </div>
    </div>
  )
}

export default WorkInformation
