import React, { ChangeEvent } from 'react'
import styles from './TextArea.module.scss'
import ImportantIcon from '@/assets/icons/ImportantIcon'

interface TextAreaProps {
  label: string
  value: string
  placeholder: string
  onChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  addImportantIcon?: boolean
  name: string
}

const TextArea: React.FC<TextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
  addImportantIcon,
  name
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event);
  };

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
        name={name}
      />
    </div>
  )
}

export default TextArea
