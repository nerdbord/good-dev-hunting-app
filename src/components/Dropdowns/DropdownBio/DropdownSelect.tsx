'use client'
import { parseHourlyRateValue } from '@/app/(profile)/mappers'
import { type ProfileFormValues } from '@/app/(profile)/types'
import { type DropdownOption } from '@/components/Dropdowns/DropdownOptionItem/DropdownOptionItem'
import { useFormikContext } from 'formik'
import 'material-icons/iconfont/material-icons.css'
import { useEffect, useRef, useState } from 'react'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import styles from './DropdownBio.module.scss'

export const DropdownSelect = ({
  label,
  name,
  text,
  options,
  selectedValue,
  id,
  dropdownTestId,
  optionTestId,
  onChange,
}: {
  label: string
  name: string
  text: string
  options: DropdownOption[]
  selectedValue: DropdownOption
  id: string
  dropdownTestId?: string
  optionTestId?: string
  error?: string
  onChange?: (option: DropdownOption) => void
}) => {
  const { setFieldValue, values } = useFormikContext<ProfileFormValues>()
  const [inputError, setInputError] = useState<boolean>(false)
  const [arrow, setArrow] = useState('IoIosArrowDown')
  const [isDropdownActive, setDropdownActive] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownActive(false)
        setArrow('IoIosArrowDown')
        if (!selectedValue && hasInteracted && !selectedValue) {
          setHasError(true)
          setInputError(true)
        }
        setHasInteracted(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectedValue, hasInteracted, selectedValue])

  const handleDropdown = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
    setDropdownActive(!isDropdownActive)
    setHasInteracted(true)
    setHasError(false)
    setInputError(false)
  }

  const handleSelection = (option: DropdownOption) => {
    console.log('Selected option:', option)
    console.log('formik values', name, option)

    // wydzieliłem tutaj ten dropdown osobno bo on przyjmuje w selekcie dwie wartości, min i max.
    if (name === 'hourlyRate') {
      const { hourlyRateMin, hourlyRateMax } = parseHourlyRateValue(
        option.value,
      )
      console.log('Parsed hourlyRateMin:', hourlyRateMin)
      console.log('Parsed hourlyRateMax:', hourlyRateMax)
      // tutaj widzimy w konsoli że values ustawiają się prawidłowo
      setFieldValue('hourlyRateMin', hourlyRateMin)
      setFieldValue('hourlyRateMax', hourlyRateMax)
      console.log('Updated Formik Values:', values)
    } else {
      // tak było zawsze, standardowo
      setFieldValue(name, option)
      console.log('huj', name, option)
      console.log('Updated Formik Values:', values)
    }

    setDropdownActive(false)
    setHasInteracted(false)
    setHasError(false)
    setInputError(false)
  }
  return (
    <div className={styles.buttonBox}>
      <div className={styles.label}>{label}</div>
      <div ref={dropdownRef}>
        <button
          onClick={handleDropdown}
          className={inputError ? styles.errMsg : styles.featuresBtn}
          data-testid={dropdownTestId}
        >
          <div
            className={`${styles.buttonText} ${
              selectedValue && styles.selectedButtonText
            }`}
          >
            {selectedValue.name || text}
          </div>
          <div className={styles.selected}>
            {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>
        </button>{' '}
        {hasError && (
          <span className={styles.errMsgText}>Field is required</span>
        )}
        {isDropdownActive && (
          <div className={styles.dropdown}>
            {options.map((option, index) => (
              <label
                key={index}
                className={styles.dropdownInput}
                htmlFor={`${id}-${index}`}
                onClick={() => handleSelection(option)}
              >
                <div
                  className={
                    selectedValue === option ? styles.selectedOption : ''
                  }
                  data-testid={optionTestId}
                >
                  {option.name}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
