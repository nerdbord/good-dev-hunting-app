'use client'
import {
  ICountries,
  countries,
} from '@/data/frontend/profile/countries/countries'
import styles from './DropdownCountry.module.scss'
import React from 'react'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'

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
                <span>{country.name}</span>
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default DropdownCountry
