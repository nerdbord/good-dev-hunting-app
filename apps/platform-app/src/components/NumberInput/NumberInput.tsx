'use client'
import React, { useState } from 'react'
import styles from './NumberInput.module.scss'

export interface NumberInputProps {
  label: string
  value: number | null | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  name: string
  placeholder?: string
  dataTestId?: string
  min?: number | null
  maxLength?: number
}

const NumberInput: React.FC<NumberInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  onBlur,
  name,
  dataTestId,
  min,
  maxLength,
}) => {
  const [isTyped, setIsTyped] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsTyped(event.target.value.length > 0)
    onChange(event)
  }

  const inputValue = value !== null && value !== undefined ? value.toString() : ''

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel}>{label}</label>
      <input
        className={`${styles.formInput} ${isTyped ? styles.typed : ''}`}
        type="number"
        value={inputValue}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        data-testid={dataTestId}
        maxLength={maxLength}
        onBlur={onBlur}
        min={min ?? undefined}
      />
    </div>
  )
}

export default NumberInput 