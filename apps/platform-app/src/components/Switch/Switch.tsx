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
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const SwitchInput: React.FC<SwitchInputProps> = ({
  id,
  label,
  checked,
  onChange,
  name,
  dataTestId,
  onBlur,
  children,
}) => {
  const [isChecked, setIsChecked] = React.useState(checked)

  React.useEffect(() => {
    setIsChecked(checked)
  }, [checked])

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(!isChecked)
    onChange(event)
  }

  return (
    <div className={styles.switchLabel} data-testid={dataTestId}>
      <span className={styles.label}>{label}</span>
      {children}
      <label className={styles.switch} htmlFor={id}>
        <input
          id={id}
          className={styles.checkbox}
          type="checkbox"
          checked={isChecked}
          onChange={handleSwitchChange}
          name={name}
          onBlur={onBlur}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  )
}

export default SwitchInput
