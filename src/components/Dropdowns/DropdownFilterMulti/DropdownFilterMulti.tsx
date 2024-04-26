import { JobOfferFiltersEnum } from '@/app/(profile)/profile.types'
import { Button } from '@/components/Button/Button'
import useOutsideClick from '@/hooks/useOutsideClick'
import { useEffect, useRef, useState } from 'react'
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
  onSearch: (filterName: JobOfferFiltersEnum, value: string) => void
}

export const DropdownFilterMulti = ({
  text,
  options,
  jobOfferFilterName,
  hasSearchInput,
  value,
  onSearch,
}: DropdownFilterMultiProps) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedValue, setSelectedValue] = useState<string[]>(value)

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

  const handleSelect = (option: string) => {
    setSelectedValue((prev) => {
      const isExists = prev.some((p) => p === option)

      if (!isExists) {
        return [...prev, option]
      }

      return prev.filter((p) => p !== option)
    })
  }

  useOutsideClick(dropdownRef, closeDropdown)

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  useEffect(() => {
    onSearch(jobOfferFilterName, selectedValue.join(','))
  }, [selectedValue])

  const clearSelect = () => {
    setSelectedValue([])
    setSearchTerm('')
    setArrow('IoIosArrowDown')
  }

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
            ></div>
            <div className={styles.dropdownHeader}>
              <div className={styles.dropdownTitle}>
                {text}
                {selectedValue.length > 0 && (
                  <span
                    className={styles.counter}
                  >{`(${selectedValue.length})`}</span>
                )}
              </div>

              {hasSearchInput && (
                <DropdownSearchInput
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  showNoMatchingOptions={filteredOptions.length < 1}
                />
              )}
              <div
                className={
                  jobOfferFilterName === JobOfferFiltersEnum.technology
                    ? styles.buttonContainerMulti
                    : styles.buttonContainer
                }
              >
                {selectedValue.length > 0 && (
                  <div className={styles.clearButton}>
                    <Button
                      variant="tertiary"
                      type="submit"
                      onClick={clearSelect}
                    >
                      <p>Clear</p>
                    </Button>
                  </div>
                )}
                <div className={styles.applyButton}>
                  <Button
                    variant="tertiary"
                    type="submit"
                    onClick={closeDropdown}
                  >
                    <p>Apply</p>
                  </Button>
                </div>
              </div>
            </div>

            {filteredOptions.map((option, index) => (
              <DropdownOptionItem
                key={index}
                option={option}
                onSelect={() => handleSelect(option.value)}
                isSelected={selectedValue.includes(option.value)}
                hasSearchInput={hasSearchInput}
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
