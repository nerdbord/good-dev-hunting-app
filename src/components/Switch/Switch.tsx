'use client'
import React from 'react'
import styles from './Switch.module.scss'

interface SwitchInputProps {
  id: string
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  dataTestId?: string
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  label,
  checked,
  onChange,
  name,
  dataTestId,
}) => {
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <div className={styles.switchLabel} data-testid={dataTestId}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch} htmlFor={id}>
        <input
          id={id}
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={handleSwitchChange}
          name={name}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}

export default SwitchInput
