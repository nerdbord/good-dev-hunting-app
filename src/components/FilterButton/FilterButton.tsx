'use client'
import styles from './FilterButton.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'

export const FilterButton = ({
  text,
  options,
  onSelect,
  selectedValue
}: {
  text: string
  options: string[]
  onSelect: (option: string) => void 
  selectedValue: string[] 
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
    onSelect(option)
  }

  return (
    <div className={styles.buttonBox}>
      <div ref={dropdownRef}>
        <button onClick={handleDropdown} className={styles.featuresBtn}>
          {selectedValue.length === 0 ? (
            <div className={styles.buttonText}>{text}</div>
          ) : (
            <div className={styles.buttonTextChecked}>{text}</div>
          )}
          {selectedValue.length !== 0 && (
            <div className={styles.selectedCount}>{selectedValue.length}</div>
          )}
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isDropdownActive && (
          <div className={styles.dropdown}>

              {options.map((option, index) => (
                <label key={index} className={styles.dropdownInput}>
                      <div className={`${styles.checkbox} ${selectedValue.includes(option) ? styles.checked : ''}`}>
                    <input
                      type="checkbox"
                      className={styles.hidden}
                      checked={selectedValue.includes(option)}
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
