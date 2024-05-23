'use client'
import React, { useState, type ChangeEvent } from 'react'
import styles from './TextArea.module.scss'

interface TextAreaProps {
  label: string
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void
  addImportantIcon?: boolean
  name: string
  excludeDigits?: boolean
  maxLength?: number
  height?: number
  tooltipText?: string | null
  dataTestId?: string
  onBlur?: (event: React.FocusEvent<HTMLTextAreaElement>) => void
}

export const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name,
  excludeDigits,
  maxLength,
  height,
  tooltipText,
  dataTestId,
  onBlur,
}) => {
  const [isTyped, setIsTyped] = useState(false)
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (excludeDigits) {
      event.target.value = event.target.value.replace(/[0-9]/g, '')
    }
    setIsTyped(event.target.value.length > 0)
    onChange(event)
  }

  return (
    <div className={styles.formItem}>
      <textarea
        className={`${styles.formTextarea} ${isTyped ? styles.typed : ''}`}
        style={height ? { height: `${height}px` } : {}}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        maxLength={maxLength}
        data-testid={dataTestId}
        onBlur={onBlur}
      />
    </div>
  )
}