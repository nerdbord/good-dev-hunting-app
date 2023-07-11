'use client'
import React from 'react'
import styles from './Switch.module.scss'

interface SwitchInputProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  label,
  checked,
  onChange,
  name
}) => {
  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
  };

  return (
    <div className={styles.switchLabel}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input
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
