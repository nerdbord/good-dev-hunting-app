'use client'
import React, { useState } from 'react'
import styles from './LocationPreferences.module.scss'
import TextInput from '@/inputs/TextInput/TextInput'
import CheckboxInput from '@/inputs/Checkbox/Checkbox'
import SwitchInput from '@/inputs/Switch/Switch'
const LocationPreferences = () => {
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [openToRelocationCountry, setOpenToRelocationCountry] = useState(false)
  const [openToRelocationCity, setOpenToRelocationCity] = useState(false)
  const [remoteOnly, setRemoteOnly] = useState(false)

  const handleCountryChange = (value: string) => {
    setCountry(value)
  }

  const handleCityChange = (value: string) => {
    setCity(value)
  }

  const handleCheckboxChangeCountry = (checked: boolean) => {
    setOpenToRelocationCountry(checked)
  }

  const handleCheckboxChangeCity = (checked: boolean) => {
    setOpenToRelocationCity(checked)
  }

  const handleSwitchChangeRemote = (checked: boolean) => {
    setRemoteOnly(checked)
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Location preferences</div>
        <div className={styles.personalInfo}>
          Share your current qualifications information. You’ll be able to
          change it at any moment.
        </div>
      </div>
      <div className={styles.right}>
        <div>
          <TextInput
            label="Country of residency"
            placeholder="Start typing location"
            value={country}
            onChange={handleCountryChange}
          />
          <CheckboxInput
            label="I’m open to residency relocation"
            checked={openToRelocationCountry}
            onChange={handleCheckboxChangeCountry}
          />
        </div>
        <div>
          <TextInput
            label="City residency"
            placeholder="Start typing location"
            value={city}
            onChange={handleCityChange}
            addImportantIcon={true}
          />
          <CheckboxInput
            label="I’m open to city relocation"
            checked={openToRelocationCity}
            onChange={handleCheckboxChangeCity}
          />
        </div>
        <SwitchInput
          checked={remoteOnly}
          label="I’m looking for remote jobs only"
          onChange={handleSwitchChangeRemote}
        />
      </div>
    </div>
  )
}

export default LocationPreferences
