'use client'
import { countries } from '@/data/countries'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useFormikContext } from 'formik'
import { useRef, useState, type ChangeEvent } from 'react'
import DropdownCountry from '../Dropdowns/DropdownCountry/DropdownCountry'
import TextInput, { type TextInputProps } from '../TextInput/TextInput'

import { LocationPreferencesFormKeys } from '@/app/[locale]/(profile)/(routes)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import { type ProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './TextInputWithDropdown.module.scss'

// Note: it's reusable by concept but inner methods are strictly suited for countries! (it's only usage for now)
const TextInputWithDropdown = ({ onBlur, name }: TextInputProps) => {
  const t = useTranslations(I18nNamespaces.LocationPreferences)
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>()
  const [inputValue, setInputValue] = useState(values.country)
  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
        label={t('residence')}
        placeholder={t('residencePlaceholder')}
        value={inputValue}
        onChange={handleInputChange}
        name={name}
        excludeDigits
        onClick={handleCountryInputClick}
        autoComplete={'new-password'}
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
