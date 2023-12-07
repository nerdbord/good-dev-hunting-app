import React, { useState } from 'react'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'
import TextInput from '../TextInput/TextInput'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import styles from './TextInputWithDropdown.module.scss'

const TextInputWithDropdown = () => {
  const { values, handleChange } = useFormikContext<CreateProfileFormValues>()

  const [isDropdownActive, setIsDropdownActive] = useState(true)

  const handleCountryInputClick = (
    e: React.MouseEvent<HTMLDivElement>,
  ): void => {
    const isTargetInput = (e.target as HTMLElement).tagName === 'INPUT'
    if (isTargetInput) {
      setIsDropdownActive(values.country.length !== 0)
    }
  }

  return (
    <div
      className={styles.container}
      onClick={(e) => handleCountryInputClick(e)}
    >
      <TextInput
        label="Country of residency"
        placeholder="Start typing location"
        value={values.country}
        onChange={handleChange}
        name="country"
        excludeDigits
      />
      {values.country.length !== 0 && isDropdownActive && (
        <DropdownCountry
          value={values.country}
          setIsDropdownActive={setIsDropdownActive}
        />
      )}
    </div>
  )
}

export default TextInputWithDropdown
