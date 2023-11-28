'use client'
import React from 'react'
import styles from './LocationPreferences.module.scss'
import TextInput from '@/components/TextInput/TextInput'
import CheckboxInput from '@/components/Checkbox/Checkbox'
import SwitchInput from '@/components/Switch/Switch'
import { useFormikContext } from 'formik'
import InputFormError from '@/components/InputFormError/InputFormError'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'

const LocationPreferences = () => {
  const { values, handleChange, errors } =
    useFormikContext<CreateProfileFormValues>()

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Location preferences</div>
        <div className={styles.personalInfo}>
          Share your current qualifications information. You’ll be able to
          change it at any moment.
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <InputFormError error={errors.country}>
            <TextInput
              label="Country of residency"
              placeholder="Start typing location"
              value={values.country}
              onChange={handleChange}
              name="country"
              excludeDigits
            />
          </InputFormError>
          <CheckboxInput
            id="openToRelocationCountry"
            label="I’m open to residency relocation"
            checked={values.openToRelocationCountry}
            onChange={handleChange}
            name="openToRelocationCountry"
          />
        </div>
        <div>
          <InputFormError error={errors.city}>
            <TextInput
              label="City residency"
              placeholder="Start typing location"
              value={values.city}
              onChange={handleChange}
              addImportantIcon={true}
              name="city"
              excludeDigits
            />
          </InputFormError>
          <CheckboxInput
            id="openToRelocationCity"
            label="I’m open to city relocation"
            checked={values.openToRelocationCity}
            onChange={handleChange}
            name="openToRelocationCity"
          />
        </div>
        <InputFormError error={errors.remoteOnly}>
          <SwitchInput
            id="remoteOnly"
            checked={values.remoteOnly}
            label="I’m looking for remote jobs only"
            onChange={handleChange}
            name="remoteOnly"
          />
        </InputFormError>
      </div>
    </div>
  )
}

export default LocationPreferences
