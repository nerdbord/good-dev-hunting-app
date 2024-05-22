'use client'

import React from 'react'
import { IoIosCheckmark } from 'react-icons/io'
import styles from './Checkbox.module.scss'

interface CheckboxInputProps {
  id: string
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  dataTestId?: string
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  children?: JSX.Element
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({
  id,
  label,
  checked,
  onChange,
  name,
  dataTestId,
  onBlur,
  children,
}) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }
  return (
    <label
      className={styles.checkboxLabel}
      htmlFor={id}
      data-testid={dataTestId}
    >
      <div className={`${styles.checkbox} ${checked ? styles.checked : ''}`}>
        <input
          id={id}
          type="checkbox"
          className={styles.hidden}
          checked={checked}
          onChange={handleCheckboxChange}
          name={name}
          onBlur={onBlur}
        />
        {checked && <IoIosCheckmark className={styles.checkmark} />}
      </div>
      {label || children}
    </label>
  )
}