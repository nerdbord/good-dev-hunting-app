'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './TextArea.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

interface TextAreaProps {
  label: string
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  addImportantIcon?: boolean
  name: string
  excludeDigits?: boolean
  maxLength?: number
  dataTestId?: string
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name,
  excludeDigits,
  maxLength,
  dataTestId,
}) => {
  const [isTyped, setIsTyped] = React.useState(false)
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
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
      <textarea
        className={`${styles.formTextarea} ${isTyped ? styles.typed : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        maxLength={maxLength}
        data-testid={dataTestId}
      />
    </div>
  )
}

export default TextArea
