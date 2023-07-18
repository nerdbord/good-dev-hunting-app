'use client'
import styles from './DropdownFilter.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'

export const DropdownFilter = ({
  label,
  text,
  options,
  onSelect,
  selectedValue,
}: {
  label: string
  text: string
  options: string[]
  onSelect: (option: string) => void
  selectedValue: string
}) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false)
        setArrow('IoIosArrowDown')
      }
    }
    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  }, [])

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
  }

  const handleSelect = (option: string) => {
    if (selectedValue === option) {
      onSelect('')
    } else {
      onSelect(option)
    }
  }

  return (
    <div className={styles.buttonBox}>
      <div className={styles.label}>{label}</div>
      <div ref={dropdownRef}>
        <button onClick={handleDropdown} className={styles.featuresBtn}>
          {selectedValue.length === 0 ? (
            <div className={styles.buttonText}>{text}</div>
          ) : (
            <div className={styles.buttonTextChecked}>{text}</div>
          )}
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isDropdownActive && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <label key={index} className={styles.dropdownInput}>
                <div
                  className={`${styles.checkbox} ${
                    selectedValue === option ? styles.checked : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className={styles.hidden}
                    checked={selectedValue === option}
                    onChange={() => handleSelect(option)}
                  />
                  {selectedValue.includes(option) && (
                    <IoIosCheckmark className={styles.checkmark} />
                  )}
                </div>{' '}
                {option}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
