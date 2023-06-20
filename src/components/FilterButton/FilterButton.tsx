'use client'
import styles from './FilterButton.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'

export const FilterButton = ({
  text,
  options,
  onSelect,
  selectedValue,
}: {
  text: string
  options: string[]
  onSelect: void
  selectedValue: string[]
}) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])

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

  const handleOptionChange = (option: string) => {
    const isSelected = selectedOptions.includes(option)
    let updatedOptions: string[]

    if (isSelected) {
      updatedOptions = selectedOptions.filter(
        (selectedOption) => selectedOption !== option,
      )
    } else {
      updatedOptions = [...selectedOptions, option]
    }

    setSelectedOptions(updatedOptions)
    console.log(`updated options - > ${updatedOptions}`)
    console.log(`selected options -> ${selectedOptions}`)
  }

  return (
    <div className={styles.buttonBox}>
      <div ref={dropdownRef}>
        <button onClick={handleDropdown} className={styles.featuresBtn}>
          {selectedOptions.length === 0 ? (
            <div className={styles.buttonText}>{text}</div>
          ) : (
            <div className={styles.buttonTextChecked}>{text}</div>
          )}
          {selectedOptions.length != 0 && (
            <div className={styles.selectedCount}>{selectedOptions.length}</div>
          )}
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isDropdownActive && (
          <div className={styles.dropdown}>
            <div className={styles.dropdownForm}>
              {options.map((option, index) => (
                <label key={index} className={styles.dropdownInput}>
                  <div className={styles.checkbox}>
                    <input
                      type="checkbox"
                      className={styles.hidden}
                      checked={selectedOptions.includes(option)}
                      onChange={() => handleOptionChange(option)}
                    />
                    {selectedOptions.includes(option) && (
                      <IoIosCheckmark className={styles.checkmark} />
                    )}
                  </div>{' '}
                  {option}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
