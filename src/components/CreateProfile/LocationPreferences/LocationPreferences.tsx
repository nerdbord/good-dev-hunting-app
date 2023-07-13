'use client'
import React from 'react'
import styles from './LocationPreferences.module.scss'
import TextInput from '@/inputs/TextInput/TextInput'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import SwitchInput from '@/inputs/Switch/Switch'
import { useFormikContext } from 'formik'
import { FormValues } from '@/services/formService'

const LocationPreferences = () => {
  const { values, handleChange, errors, touched, setFieldValue, handleBlur } =
    useFormikContext<FormValues>()

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
          <div className={errors.country ? styles.errorMsg : ''}>
            <TextInput
              label="Country of residency"
              placeholder="Start typing location"
              value={values.country}
              onChange={handleChange}
              name="country"
            />
            <p>{errors.country as string}</p>
          </div>

          <CheckboxInput
            label="I’m open to residency relocation"
            checked={values.openToRelocationCountry}
            onChange={(e) => {
              setFieldValue('openToRelocationCountry', e.target.checked)
            }}
            name="openToRelocationCountry"
          />
        </div>
        <div>
          <div className={errors.city ? styles.errorMsg : ''}>
            <TextInput
              label="City residency"
              placeholder="Start typing location"
              value={values.city}
              onChange={handleChange}
              addImportantIcon={true}
              name="city"
            />
            <p>{errors.city as string}</p>
          </div>
          <CheckboxInput
            label="I’m open to city relocation"
            checked={values.openToRelocationCity}
            onChange={handleChange}
            name="openToRelocationCity"
          />
        </div>
        <div className={errors.remoteOnly ? styles.errorMsg : ''}>
          <SwitchInput
            checked={values.remoteOnly}
            label="I’m looking for remote jobs only"
            onChange={handleChange}
            name="remoteOnly"
            onBlur={handleBlur}
          />
          {touched?.remoteOnly && errors?.remoteOnly && (
            <p>{errors.remoteOnly as string}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default LocationPreferences
