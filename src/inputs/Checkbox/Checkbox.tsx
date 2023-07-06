'use client'
import React from 'react'
import styles from './Checkbox.module.scss'
import { IoIosCheckmark } from 'react-icons/io'

interface CheckboxInputProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const CheckboxInput: React.FC<CheckboxInputProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleCheckboxChange = () => {
    onChange(!checked)
  }

  return (
    <label className={styles.checkboxLabel}>
      <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
        <input
          type="checkbox"
          className={styles.hidden}
          checked={checked}
          onChange={handleCheckboxChange}
        />
        {checked && <IoIosCheckmark className={styles.checkmark} />}
      </div>
      {label}
    </label>
  )
}

export default CheckboxInput
