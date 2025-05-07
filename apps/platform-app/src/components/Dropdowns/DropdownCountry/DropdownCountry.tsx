// src/components/Dropdowns/DropdownCountry/DropdownCountry.tsx
'use client'
import { countries, getCountryName } from '@/data/countries'
import Image from 'next/image'
import React from 'react'
import styles from './DropdownCountry.module.scss'

interface DropdownCountryProps {
  inputValue: string
  locale: string
  onCountrySelect: (country_en: string) => void
  setIsDropdownActive: React.Dispatch<React.SetStateAction<boolean>>
}

const DropdownCountry = ({
  inputValue,
  locale,
  onCountrySelect,
  setIsDropdownActive,
}: DropdownCountryProps) => {
  const handleCountryClick = (
    e: React.MouseEvent<HTMLLIElement>,
    country_en: string,
  ) => {
    onCountrySelect(country_en)
    setIsDropdownActive(false)
  }

  const renderCountryName = (country: string) => {
    const countryName = getCountryName(country, locale)
    const startIndex = countryName
      .toLowerCase()
      .indexOf(inputValue.toLowerCase())

    // Highlight the matching part of the country name
    if (startIndex === 0) {
      // Only highlight if match is at the beginning
      const boldPart = countryName.slice(
        startIndex,
        startIndex + inputValue.length,
      )
      const restPart = countryName.slice(startIndex + inputValue.length)
      return (
        <>
          <span className={styles.bold}>{boldPart}</span>
          <span>{restPart}</span>
        </>
      )
    }
    return <span>{countryName}</span>
  }

  const filteredCountries = countries.filter((country) =>
    getCountryName(country.name_en, locale)
      .toLowerCase()
      .startsWith(inputValue.toLowerCase()),
  )

  return (
    <div className={styles.dropdownBox}>
      <ul>
        {filteredCountries.map((country) => {
          // Use country.code as key for stability if names repeat (unlikely but possible)
          return (
            <li
              key={country.code}
              onClick={(e) => handleCountryClick(e, country.name_en)}
            >
              {/* Assuming flags are based on country code */}
              <Image
                // Use a more reliable flag source if available, or handle potential errors
                src={`https://flagsapi.com/${country.code}/flat/24.png`}
                alt={`Flag of ${country.name_en}`} // Alt text should be consistent, English is safer
                width={24}
                height={24}
                onError={(e) => {
                  // Optional: handle flag loading errors, e.g., hide image
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span>{renderCountryName(country.name_en)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default DropdownCountry
