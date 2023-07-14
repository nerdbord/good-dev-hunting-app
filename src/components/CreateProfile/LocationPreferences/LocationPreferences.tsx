'use client'
import React from 'react'
import styles from './LocationPreferences.module.scss'
import TextInput from '@/inputs/TextInput/TextInput'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import SwitchInput from '@/inputs/Switch/Switch'
import { useFormikContext } from 'formik'
import { FormValues } from '@/services/createProfileFormService'
import CreateProfileFormError from '@/components/CreateProfileForm/CreateProfileFormErrorWrapper'

const LocationPreferences = () => {
  const { values, handleChange, errors } = useFormikContext<FormValues>()

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
          <CreateProfileFormError error={errors.country}>
            <TextInput
              label="Country of residency"
              placeholder="Start typing location"
              value={values.country}
              onChange={handleChange}
              name="country"
            />
          </CreateProfileFormError>
          <CheckboxInput
            id="openToRelocationCountry"
            label="I’m open to residency relocation"
            checked={values.openToRelocationCountry}
            onChange={handleChange}
            name="openToRelocationCountry"
          />
        </div>
        <div>
          <CreateProfileFormError error={errors.city}>
            <TextInput
              label="City residency"
              placeholder="Start typing location"
              value={values.city}
              onChange={handleChange}
              addImportantIcon={true}
              name="city"
            />
          </CreateProfileFormError>
          <CheckboxInput
            id="openToRelocationCity"
            label="I’m open to city relocation"
            checked={values.openToRelocationCity}
            onChange={handleChange}
            name="openToRelocationCity"
          />
        </div>
        <CreateProfileFormError error={errors.remoteOnly}>
          <SwitchInput
            id="remoteOnly"
            checked={values.remoteOnly}
            label="I’m looking for remote jobs only"
            onChange={handleChange}
            name="remoteOnly"
          />
        </CreateProfileFormError>
      </div>
    </div>
  )
}

export default LocationPreferences
