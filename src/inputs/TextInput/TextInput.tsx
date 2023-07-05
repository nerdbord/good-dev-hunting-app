import React, { ChangeEvent } from 'react'
import styles from './TextInput.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

interface TextInputProps {
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
  addImportantIcon?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
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
      />
    </div>
  )
}

export default TextInput
