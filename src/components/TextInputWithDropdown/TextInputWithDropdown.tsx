import React from 'react'
import TextInput from '../TextInput/TextInput'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import styles from './TextInputWithDropdown.module.scss'

const TextInputWithDropdown = () => {
  const { values, handleChange, errors } =
    useFormikContext<CreateProfileFormValues>()
  return (
    <div className={styles.container}>
      <TextInput
        label="Country of residency"
        placeholder="Start typing location"
        value={values.country}
        onChange={handleChange}
        name="country"
        excludeDigits
      />
      {values.country.length !== 0 && (
        <DropdownCountry value={values.country} />
      )}
    </div>
  )
}

export default TextInputWithDropdown
