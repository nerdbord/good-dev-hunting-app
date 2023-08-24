'use client'
import React, { ChangeEvent } from 'react'
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
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name,
  disabled,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && <ImportantIcon />}
      </label>
      <input
        className={styles.formInput}
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
