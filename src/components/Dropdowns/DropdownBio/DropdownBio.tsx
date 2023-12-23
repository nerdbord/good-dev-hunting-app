'use client'
import styles from './DropdownBio.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import { useFormikContext } from 'formik'
import { CreateProfileFormValues } from '@/components/CreateProfileForm/CreateProfileFormWrapper'

export const DropdownBio = ({
  label,
  name,
  text,
  options,
  selectedValue,
  id,
  dropdownTestId,
  optionTestId,
  error,
}: {
  label: string
  name: string
  text: string
  options: string[]
  selectedValue: string
  id: string
  dropdownTestId?: string
  optionTestId?: string
  error?: string
  onBlur?: (event: React.FocusEvent<HTMLDivElement>) => void
}) => {
  const { setFieldValue, errors } = useFormikContext<CreateProfileFormValues>()
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)
  const [errMsg, setErrorMsg] = useState<string>('')
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false)
        setArrow('IoIosArrowDown')
        if (!selectedValue && hasInteracted && !selectedValue) {
          setHasError(true)
          setErrorMsg('Field is required')
        }
        setHasInteracted(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedValue, hasInteracted, selectedValue])

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
    setHasInteracted(true)
    setHasError(false)
    setErrorMsg('')
  }

  const handleSelection = (option: string) => {
    setFieldValue(name, option)
    setDropdownActive(false)
    setHasInteracted(false)
    setHasError(false)
    setErrorMsg('')
  }

  return (
    <div className={styles.buttonBox}>
      <div className={styles.label}>{label}</div>
      <div ref={dropdownRef}>
        <button
          onClick={handleDropdown}
          className={errMsg ? styles.errFeatureBtn : styles.featuresBtn}
          data-testid={dropdownTestId}
        >
          <div className={styles.buttonText}>{selectedValue || text}</div>
          <div className={styles.selected}>
            {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </button>{' '}
        {hasError && error && <span className={styles.errorMsg}>{error}</span>}
        {isDropdownActive && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <label
                key={index}
                className={styles.dropdownInput}
                htmlFor={`${id}-${index}`}
              >
                <div
                  className={
                    selectedValue === option ? styles.selectedOption : ''
                  }
                  onClick={() => handleSelection(option)}
                  data-testid={optionTestId}
                >
                  {option}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
      {(errMsg && !errors.position) || !errors.seniority ? (
        <div className={styles.errorMsg}>{errMsg}</div>
      ) : (
        ''
      )}
    </div>
  )
}
