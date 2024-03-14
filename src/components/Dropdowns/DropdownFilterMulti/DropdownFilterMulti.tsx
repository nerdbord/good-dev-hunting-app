import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { Button } from '@/components/Button/Button'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import {
  DropdownOptionItem,
  type DropdownOption,
} from '../DropdownOptionItem/DropdownOptionItem'
import { DropdownSearchInput } from '../DropdownSearchInput/DropdownSearchInput'
import styles from './DropdownFilterMulti.module.scss'

type DropdownFilterMultiProps = {
  text: string
  options: DropdownOption[]
  hasSearchInput?: boolean
  jobOfferFilterName: JobOfferFiltersEnum
  value: string[]
  onChange: (filterName: JobOfferFiltersEnum, value: string) => void
}

export const DropdownFilterMulti = ({
  text,
  options,
  jobOfferFilterName,
  hasSearchInput,
  value,
  onChange,
}: DropdownFilterMultiProps) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useOutsideClick(
    dropdownRef,
    () => setDropdownActive(false),
    () => setArrow('IoIosArrowDown'),
  )

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
    <>
      {isDropdownActive && <div className={styles.overlay}></div>}
      <div className={styles.buttonBox} ref={dropdownRef}>
        <button onClick={() => handleDropdown()} className={styles.featuresBtn}>
          {value.length === 0 ? (
            <div className={styles.buttonText}>{text}</div>
          ) : (
            <div className={styles.buttonTextChecked}>{text}</div>
          )}
          {value.length !== 0 && (
            <div className={styles.selectedCount}>{value.length}</div>
          )}
          {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {isDropdownActive && (
          <div className={styles.dropdown}>
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
                onSelect={() => onChange(jobOfferFilterName, option.value)}
                isSelected={value?.includes(option.value)}
                hasSearchInput={hasSearchInput}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
