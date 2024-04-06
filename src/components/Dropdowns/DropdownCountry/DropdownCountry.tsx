'use client'
import { LocationPreferencesFormKeys } from '@/app/(profile)/my-profile/(components)/CreateProfile/LocationPreferences/LocationPreferences'
import { type ProfileFormValues } from '@/app/(profile)/types'
import { countries, type ICountries } from '@/data/countries'
import { useFormikContext } from 'formik'
import React from 'react'
import styles from './DropdownCountry.module.scss'

const DropdownCountry = ({
  value,
  setValue,
  setIsDropdownActive,
}: {
  value: string
  setValue: (value: string) => void
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { values, setFieldValue } = useFormikContext<ProfileFormValues>()

  const handleCountryClick = (
    e: React.MouseEvent<HTMLLIElement>,
    country: ICountries,
  ) => {
    setValue(country.name)
    setFieldValue(LocationPreferencesFormKeys.COUNTRY, country.name)
    setIsDropdownActive(false)
    values.country = country.name
  }

  const handleOnSelect = () => {
    setIsDropdownActive(false)
  }

  const renderCountryName = (countryName: string) => {
    const startIndex = countryName.toLowerCase().indexOf(value.toLowerCase())
    if (startIndex !== -1) {
      const boldPart = countryName.slice(startIndex, startIndex + value.length)
      const restPart = countryName.slice(startIndex + value.length)
      return (
        <>
          <span className={styles.bold}>{boldPart}</span>
          <span>{restPart}</span>
        </>
      )
    }
    return <span>{countryName}</span>
  }

  return (
    <div className={styles.dropdownBox}>
      <ul>
        {countries
          .filter((country) =>
            country.name.toLowerCase().startsWith(value.toLowerCase()),
          )
          .map((country, index) => {
            return (
              <li
                key={index}
                onClick={(e) => handleCountryClick(e, country)}
                onSelect={handleOnSelect}
              >
                <img src={`https://flagsapi.com/${country.flag}/flat/24.png`} />
                <span>{renderCountryName(country.name)}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default DropdownCountry
