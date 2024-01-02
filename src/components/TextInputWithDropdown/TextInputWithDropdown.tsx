import React, { useRef, useState } from 'react'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'
import TextInput from '../TextInput/TextInput'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import styles from './TextInputWithDropdown.module.scss'
import { countries } from '@/data/frontend/profile/countries/countries'
import useOutsideClick from '@/hooks/useOutsideClick'

interface TextInputWithDropdownProps {
  dataTestId?: string
  id?: string
}

const TextInputWithDropdown = ({
  dataTestId,
  id,
}: TextInputWithDropdownProps) => {
  const { values, handleChange, setFieldValue } =
    useFormikContext<CreateProfileFormValues>()
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const preventInvalidCountry = () => {
    const inputValue = inputRef.current?.value
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
        label="Country of residency"
        placeholder="Start typing location"
        value={values.country}
        onChange={handleChange}
        name="country"
        excludeDigits
        onClick={handleCountryInputClick}
        inputRef={inputRef}
        dataTestId={dataTestId}
      />
      {values.country.length !== 0 && isDropdownActive && (
        <div ref={dropdownRef}>
          <DropdownCountry
            value={values.country}
            setIsDropdownActive={setIsDropdownActive}
            id={id}
          />
        </div>
      )}
    </div>
  )
}

export default TextInputWithDropdown
