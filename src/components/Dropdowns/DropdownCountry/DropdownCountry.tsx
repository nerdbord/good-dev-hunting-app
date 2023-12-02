'use client'
import { countries } from '@/data/frontend/profile/countries/countries'
import React from 'react'

const DropdownCountry = ({ value }: { value: string }) => {
  return (
    <div>
      <ul>
        {countries
          .filter((country) => country.name.startsWith(value))
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
