'use client'
import React from 'react'
import { DropdownBio } from '@/components/Dropdowns/DropdownBio/DropdownBio'
import TextArea from '@/components/TextArea/TextArea'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/InputFormError/InputFormError'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import { EmploymentType } from '@prisma/client'

import styles from './WorkInformations.module.scss'

const filterLists = {
  seniority: ['Intern', 'Junior', 'Mid', 'Senior'],
  position: ['Frontend', 'Backend', 'Fullstack'],
}

const WorkInformation = () => {
  const { values, handleChange, errors, setFieldValue, touched, handleBlur } =
    useFormikContext<CreateProfileFormValues>()

  const handleEmploymentType = (option: string): void => {
    setFieldValue('employment', option)
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
        <DropdownBio
          id="position"
          label="Position"
          text="Choose position"
          options={filterLists.position}
          selectedValue={values.position}
          error={errors.position}
          name="position"
          dropdownTestId="position"
          optionTestId="positionOption"
        />
        <DropdownBio
          id="seniority"
          label="Seniority"
          text="Choose seniority"
          options={filterLists.seniority}
          selectedValue={values.seniority}
          error={errors.seniority}
          name="seniority"
          dropdownTestId="seniority"
          optionTestId="seniorityOption"
        />
        <div>
          <InputFormError error={touched.techStack && errors.techStack}>
            <TextArea
              onBlur={handleBlur}
              label="Tech stack"
              placeholder="Start typing"
              value={values.techStack}
              addImportantIcon={true}
              onChange={handleChange}
              name="techStack"
              excludeDigits
              tooltipText="List the technologies you are comfortable with or interested in."
              dataTestId="techStack"
            />
          </InputFormError>
          <div className={styles.addInfo}>
            Start typing and separate technologies with commas.
            <br />
            Choose max. 8
          </div>
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
