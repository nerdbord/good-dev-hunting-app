'use client'
import { Button } from '@/components/Button/Button'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import useOutsideClick from '@/hooks/useOutsideClick'
import 'material-icons/iconfont/material-icons.css'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp, IoIosCheckmark } from 'react-icons/io'
import styles from '../DropdownFilter/DropdownFilter.module.scss'

export const DropdownFilterMulti = ({
  text,
  options,
  onSelect,
  selectedValue,
}: {
  text: string
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  selectedValue: DropdownOption[]
}) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  useOutsideClick(
    dropdownRef,
    () => setDropdownActive(false),
    () => setArrow('IoIosArrowDown'),
  )

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
    onSelect(option)
  }

  const closeDropdown = () => {
    setDropdownActive(false)
    setArrow('IoIosArrowDown')
  }

  useOutsideClick(dropdownRef, closeDropdown)

  const [isOverlayActive, setOverlayActive] = useState(false)
  return (
    <div className={styles.buttonBox}>
      <div>
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
        {isOverlayActive && <div className={styles.overlay}></div>}
        {isDropdownActive && (
          <div className={styles.dropdown} ref={dropdownRef}>
            <div className={styles.titleContainer}>
              <div className={styles.dropdownTitle}>{text}</div>
              <Button variant="tertiary" type="submit" onClick={closeDropdown}>
                Apply
              </Button>
            </div>
            {options.map((option, index) => (
              <label key={index} className={styles.dropdownInput}>
                <div
                  className={`${styles.checkbox} ${
                    selectedValue.includes(option) ? styles.checked : ''
                  }`}
                >
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
                {option.name}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
