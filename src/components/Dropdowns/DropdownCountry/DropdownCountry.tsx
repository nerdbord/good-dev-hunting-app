'use client'
import React from 'react'
import {
  ICountries,
  countries,
} from '@/data/frontend/profile/countries/countries'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'
import styles from './DropdownCountry.module.scss'

const DropdownCountry = ({
  value,
  setIsDropdownActive,
}: {
  value: string
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const { values, setFieldValue } = useFormikContext<CreateProfileFormValues>()

  const handleCountryClick = (
    e: React.MouseEvent<HTMLLIElement>,
    country: ICountries,
  ) => {
    setFieldValue('country', values.country)
    setIsDropdownActive(false)
    values.country = country.name
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
              <li key={index} onClick={(e) => handleCountryClick(e, country)}>
                <span>{country.flag}</span>
                <span>{renderCountryName(country.name)}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default DropdownCountry
