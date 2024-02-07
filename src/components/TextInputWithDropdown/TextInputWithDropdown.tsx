'use client'
import { countries } from '@/data/countries'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useFormikContext } from 'formik'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import TextInput, { TextInputProps } from '../TextInput/TextInput'

import { LocationPreferencesFormKeys } from '@/app/(profile)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import { ProfileFormValues } from '@/app/(profile)/types'
import styles from './TextInputWithDropdown.module.scss'

// Note: it's reusable by concept but inner methods are strictly suited for countries! (it's only usage for now)
const TextInputWithDropdown = ({ onBlur, name }: TextInputProps) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>()
  const [inputValue, setInputValue] = useState(values.country)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isValidCountry(inputValue)) {
      setFieldValue(LocationPreferencesFormKeys.COUNTRY, '')
    }
  }, [inputValue, setFieldValue])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    if (event.target.value !== values.country) {
      setFieldValue(LocationPreferencesFormKeys.COUNTRY, '')
    }
    preventInvalidCountry()
  }

  const preventInvalidCountry = () => {
    if (!isValidCountry(inputValue)) {
      const validCountry = countries.find((country) =>
        inputValue?.includes(country.name),
      )
      setFieldValue('country', `${validCountry?.name ? validCountry.name : ''}`)
    }
  }

  const isValidCountry = (countryName: string | undefined) => {
    if (countryName) {
      return countries.some((country) =>
        country.name.toLowerCase().includes(countryName.toLowerCase()),
      )
    }
  }
  const handleCountryInputClick = () => {
    setIsDropdownActive(!isDropdownActive)
  }

  useOutsideClick(
    dropdownRef,
    () => setIsDropdownActive(false),
    preventInvalidCountry,
  )

  return (
    <div className={styles.container} onClick={handleCountryInputClick}>
      <TextInput
        onBlur={onBlur}
        label="Country of residency"
        placeholder="Start typing location"
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        excludeDigits
        onClick={handleCountryInputClick}
      />
      {inputValue.length !== 0 && isDropdownActive && (
        <div ref={dropdownRef}>
          <DropdownCountry
            value={inputValue}
            setValue={setInputValue}
            setIsDropdownActive={setIsDropdownActive}
          />
        </div>
      )}
    </div>
  )
}

export default TextInputWithDropdown
