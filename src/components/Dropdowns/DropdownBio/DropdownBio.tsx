'use client'
import styles from './DropdownBio.module.scss'
import React, { useEffect, useState, useRef } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown, IoIosCheckmark } from 'react-icons/io'
import classNames from 'classnames/bind'
import { useFormikContext } from 'formik'

const cx = classNames.bind(styles)

export const DropdownBio = ({
  label,
  name,
  text,
  options,
  selectedValue,
  id,
}: {
  label: string
  name: string
  text: string
  options: string[]
  selectedValue: string
  id: string
}) => {
  const { setFieldValue } = useFormikContext()
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false)
        setArrow('IoIosArrowDown')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
  }

  const handleSelection = (option: string) => {
    setFieldValue(name, option);
    setDropdownActive(false);
}

  return (
    <div className={styles.buttonBox}>
      <div className={styles.label}>{label}</div>
      <div ref={dropdownRef}>
        <button onClick={handleDropdown} className={styles.featuresBtn}>
          <div className={styles.buttonText}>{selectedValue || text}</div>
          <div className={styles.selected}>
            {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </button>
        {isDropdownActive && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <label
                key={index}
                className={styles.dropdownInput}
                htmlFor={`${id}-${index}`}
              >
            <div
                className={selectedValue === option ? styles.selectedOption : ''}
                onClick={() => handleSelection(option)}
            >
                {option}
            </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
