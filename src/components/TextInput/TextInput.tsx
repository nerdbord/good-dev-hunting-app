'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './TextInput.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

interface TextInputProps {
  label: string
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  addImportantIcon?: boolean
  name: string
  error?: string
  disabled?: boolean
  excludeDigits?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name,
  disabled,
  excludeDigits,
}) => {
  const [isTyped, setIsTyped] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (excludeDigits) {
      event.target.value = event.target.value.replace(/[0-9]/g, '')
    }
    setIsTyped(event.target.value.length > 0)
    onChange(event)
  }

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && <ImportantIcon />}
      </label>
      <input
        className={`${styles.formInput} ${isTyped ? styles.typed : ''}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        disabled={disabled}
      />
    </div>
  )
}

export default TextInput
