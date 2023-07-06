'use client'
import React from 'react'
import styles from './Switch.module.scss'

interface SwitchInputProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  label,
  checked,
  onChange,
}) => {
  const handleSwitchChange = () => {
    onChange(!checked)
  }

  return (
    <div className={styles.switchLabel}>
      <span className={styles.label}>{label}</span>
      <label className={styles.switch}>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={checked}
          onChange={handleSwitchChange}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}

export default SwitchInput
