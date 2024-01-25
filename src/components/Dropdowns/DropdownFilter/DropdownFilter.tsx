'use client'
import styles from './DropdownFilter.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'
import { Button } from '@/components/Button/Button'
import { initialDropdownOption } from '@/contexts/FilterContext'

export interface DropdownOption {
  name: string
  value: string
}

export const DropdownFilter = ({
  label,
  text,
  options,
  onSelect,
  selectedValue,
}: {
  label?: string
  text: string
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  selectedValue: DropdownOption
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

  useEffect(() => {
    switch (isDropdownActive) {
      case true:
        setOverlayActive(true)
        document.body.classList.add('blurBackground')
        break
      case false:
        setOverlayActive(false)
        document.body.classList.remove('blurBackground')
        break
      default:
        break
    }
  }, [isDropdownActive])

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
  }

  const handleSelect = (option: DropdownOption) => {
    if (selectedValue.value === option.value) {
      onSelect(initialDropdownOption)
    } else {
      onSelect(option)
    }
  }

  const [isOverlayActive, setOverlayActive] = useState(false)

  return (
    <div className={styles.buttonBox}>
      <div ref={dropdownRef}>
        <button onClick={handleDropdown} className={styles.featuresBtn}>
          {selectedValue.value.length === 0 ? (
            <div className={styles.buttonText}>{text}</div>
          ) : (
            <div className={styles.buttonTextChecked}>{text}</div>
          )}
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isOverlayActive && <div className={styles.overlay}></div>}
        {isDropdownActive && (
          <div className={styles.dropdown}>
            <div className={styles.titleContainer}>
              <div className={styles.dropdownTitle}>{label || text}</div>

              <Button
                variant="tertiary"
                type="submit"
                onClick={() => {
                  setDropdownActive(false)
                  setArrow('IoIosArrowDown')
                }}
              >
                Apply
              </Button>
            </div>

            {options.map((option, index) => (
              <label key={index} className={styles.dropdownInput}>
                <div
                  className={`${styles.checkbox} ${
                    selectedValue.value === option.value ? styles.checked : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    className={styles.hidden}
                    checked={selectedValue.value === option.value}
                    onChange={() => handleSelect(option)}
                  />

                  {selectedValue?.value.includes(option.value) && (
                    <IoIosCheckmark className={styles.checkmark} />
                  )}
                </div>{' '}
                {option.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
