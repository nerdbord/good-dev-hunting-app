import React, { useEffect, useRef, useState } from 'react'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'
import TextInput from '../TextInput/TextInput'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import styles from './TextInputWithDropdown.module.scss'

const TextInputWithDropdown = () => {
  const { values, handleChange } = useFormikContext<CreateProfileFormValues>()

  const [isDropdownActive, setIsDropdownActive] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleCountryInputClick = () => {
    setIsDropdownActive(!isDropdownActive)
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleClickOutside = (e: MouseEvent) => {
    const dropdownContainer = dropdownRef.current
    if (dropdownContainer && !dropdownContainer.contains(e.target as Node)) {
      setIsDropdownActive(false)
    }
  }

  return (
    <div className={styles.container} onClick={handleCountryInputClick}>
      <TextInput
        label="Country of residency"
        placeholder="Start typing location"
        value={values.country}
        onChange={handleChange}
        name="country"
        excludeDigits
        onClick={handleCountryInputClick}
      />
      {values.country.length !== 0 && isDropdownActive && (
        <div ref={dropdownRef}>
          <DropdownCountry
            value={values.country}
            setIsDropdownActive={setIsDropdownActive}
          />
        </div>
      )}
    </div>
  )
}

export default TextInputWithDropdown
