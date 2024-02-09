'use client'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import React, { useState } from 'react'
import Tooltip from '../Tooltip/Tooltip'
import styles from './TextInput.module.scss'

export interface TextInputProps {
  label?: string
  value?: string
  placeholder?: string
  onChange(event: React.ChangeEvent<HTMLInputElement>): void
  addImportantIcon?: boolean
  name?: string
  error?: string
  disabled?: boolean
  excludeDigits?: boolean
  tooltipText?: string | null
  onClick?(event: React.MouseEvent<HTMLInputElement>): void
  inputRef?: React.Ref<HTMLInputElement>
  dataTestId?: string
  maxLength?: number
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  customClass?: string
  autoComplete?: string
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
  tooltipText,
  onClick,
  inputRef,
  dataTestId,
  maxLength,
  onBlur,
  customClass = '',
  autoComplete,
}) => {
  const [isTyped, setIsTyped] = useState(false)
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
        {addImportantIcon && (
          <Tooltip text={tooltipText || null}>
            <ImportantIcon />
          </Tooltip>
        )}
      </label>
      <input
        className={`${styles.formInput} ${
          isTyped ? styles.typed : ''
        } ${customClass}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        disabled={disabled}
        onClick={onClick}
        ref={inputRef}
        data-testid={dataTestId}
        maxLength={maxLength}
        onBlur={onBlur}
        autoComplete={autoComplete}
      />
    </div>
  )
}

export default TextInput
