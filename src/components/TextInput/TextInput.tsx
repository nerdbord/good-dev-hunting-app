'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './TextInput.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import Tooltip from '../Tooltip/Tooltip'

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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
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
  onBlur,
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
        className={`${styles.formInput} ${isTyped ? styles.typed : ''}`}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        disabled={disabled}
        onClick={onClick}
        ref={inputRef}
        data-testid={dataTestId}
        onBlur={onBlur}
      />
    </div>
  )
}

export default TextInput
