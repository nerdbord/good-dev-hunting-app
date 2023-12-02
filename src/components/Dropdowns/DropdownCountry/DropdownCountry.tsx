'use client'
import { countries } from '@/data/frontend/profile/countries/countries'
import styles from './DropdownCountry.module.scss'
import React from 'react'

const DropdownCountry = ({ value }: { value: string }) => {
  return (
    <div className={styles.dropdownBox}>
      <ul>
        {countries
          .filter((country) =>
            country.name.toLowerCase().startsWith(value.toLowerCase()),
          )
          .map((country, index) => {
            return (
              <li key={index}>
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
