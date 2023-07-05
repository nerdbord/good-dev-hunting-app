import React, { ChangeEvent } from 'react'
import styles from './TextArea.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

interface TextAreaProps {
  label: string
  value: string
  placeholder: string
  onChange: (value: string) => void
  addImportantIcon?: boolean
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className={styles.formItem}>
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && <ImportantIcon />}
      </label>
      <textarea
        className={styles.formTextarea} // Updated class name
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default TextArea
