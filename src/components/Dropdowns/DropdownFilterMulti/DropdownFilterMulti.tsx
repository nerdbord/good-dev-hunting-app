'use client'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { Button } from '@/components/Button/Button'
import useOutsideClick from '@/hooks/useOutsideClick'
import { createQueryString } from '@/utils/createQueryString'
import 'material-icons/iconfont/material-icons.css'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
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
}

export const DropdownFilterMulti = ({
  text,
  options,
  jobOfferFilterName,
  hasSearchInput,
}: DropdownFilterMultiProps) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [isOverlayActive, setOverlayActive] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = searchParams.getAll(jobOfferFilterName)
  const [selectedValue, setSelectedValue] = useState<string[]>(params || [])

  const handleSelect = (option: string) => {
    setSelectedValue((prev) => {
      const isExists = prev.some((p) => p === option)

      if (!isExists) {
        return [...prev, option]
      }

      return prev.filter((p) => p !== option)
    })
  }

  useOutsideClick(
    dropdownRef,
    () => setDropdownActive(false),
    () => setArrow('IoIosArrowDown'),
  )

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString(
        jobOfferFilterName,
        selectedValue.join(','),
        searchParams,
      )}`,
    )
  }, [selectedValue])

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
                onSelect={() => handleSelect(option.value)}
                isSelected={selectedValue.includes(option.value)}
                hasSearchInput={hasSearchInput}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
