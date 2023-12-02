'use client'
import React, { ChangeEvent, useState } from 'react'
import styles from './TextArea.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import Tooltip from '@/components/Tooltip/Tooltip'

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
  height,
  tooltipText,
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
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && (
          <Tooltip text={tooltipText || null}>
            <ImportantIcon />
          </Tooltip>
        )}
      </label>
      <textarea
        className={`${styles.formTextarea} ${isTyped ? styles.typed : ''}`}
        style={height ? { height: `${height}px` } : {}}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        maxLength={maxLength}
      />
    </div>
  )
}

export default TextArea
