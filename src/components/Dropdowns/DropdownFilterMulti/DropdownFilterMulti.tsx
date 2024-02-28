'use client'
import { Button } from '@/components/Button/Button'
import { DropdownOption } from '@/components/Dropdowns/DropdownFilter/DropdownFilter'
import useOutsideClick from '@/hooks/useOutsideClick'
import 'material-icons/iconfont/material-icons.css'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from '../DropdownFilter/DropdownFilter.module.scss'
import { DropdownOptionItem } from '../DropdownOptionItem/DropdownOptionItem'
import { DropdownSearchInput } from '../DropdownSearchInput/DropdownSearchInput'

export const DropdownFilterMulti = ({
  text,
  options,
  onSelect,
  selectedValue,
  hasSearchInput,
}: {
  text: string
  options: DropdownOption[]
  onSelect: (option: DropdownOption) => void
  selectedValue: DropdownOption[]
  hasSearchInput?: boolean
}) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOverlayActive, setOverlayActive] = useState(false)

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

  const closeDropdown = () => {
    setDropdownActive(false)
    setArrow('IoIosArrowDown')
  }

  useOutsideClick(dropdownRef, closeDropdown)

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

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
            <div
              className={
                hasSearchInput
                  ? styles.titleContainerSearch
                  : styles.titleContainer
              }
            >
              <div className={styles.dropdownTitle}>{text}</div>
              <Button variant="tertiary" type="submit" onClick={closeDropdown}>
                <p>Apply</p>
              </Button>
            </div>
            {hasSearchInput && (
              <DropdownSearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showNoMatchingOptions={filteredOptions.length < 1}
              />
            )}
            {filteredOptions.map((option, index) => (
              <DropdownOptionItem
                key={index}
                option={option}
                onSelect={onSelect}
                isSelected={selectedValue.includes(option)}
                hasSearchInput={hasSearchInput}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
