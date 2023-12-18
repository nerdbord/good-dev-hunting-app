import React, { useState, useRef } from 'react'
import styles from './TechStackInput.module.scss'
import CancelIcon from '@/assets/icons/CancelIcon'
import ImportantIcon from '@/assets/icons/ImportantIcon'
import Tooltip from '../Tooltip/Tooltip'
import { CreateProfileFormValues } from '../CreateProfileForm/CreateProfileFormWrapper'
import { useFormikContext } from 'formik'

interface TechStackInputProps {
  chips: string[]
  inputValue: string
  setInputValue: (value: string) => void
  filteredSuggestions: string[]
  onTechSelect: (tech: string) => void
  onTechRemove: (tech: string) => void
  placeholder: string
  name: string
  label: string
  addImportantIcon?: boolean
  tooltipText?: string | null
  onBlur?: (event: React.FocusEvent<HTMLElement>) => void
}

const TechStackInput: React.FC<TechStackInputProps> = ({
  chips,
  inputValue,
  setInputValue,
  filteredSuggestions,
  onTechSelect,
  onTechRemove,
  placeholder,
  name,
  label,
  addImportantIcon,
  tooltipText,
  onBlur,
}) => {
  const { errors, handleBlur } = useFormikContext<CreateProfileFormValues>()
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chipsContainerRef = useRef(null)
  const maxChips = 8

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue && chips.length < maxChips) {
      if (filteredSuggestions.includes(inputValue)) {
        onTechSelect(inputValue)
        setInputValue('')
      }
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    if (chips.length < maxChips) {
      onTechSelect(suggestion)
      setInputValue('')
      inputRef.current?.focus()
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  // const handleBlur = () => {
  //   setIsFocused(false)
  // }

  const filteredAvailableSuggestions = filteredSuggestions.filter(
    (suggestion) => !chips.includes(suggestion),
  )

  const renderSuggestionItem = (suggestion: string) => {
    const indexOfMatch = suggestion
      .toLowerCase()
      .indexOf(inputValue.toLowerCase())
    if (indexOfMatch === -1) {
      return <span>{suggestion}</span>
    }
    const beforeMatch = suggestion.substring(0, indexOfMatch)
    const matchText = suggestion.substring(
      indexOfMatch,
      indexOfMatch + inputValue.length,
    )
    const afterMatch = suggestion.substring(indexOfMatch + inputValue.length)
    return (
      <span>
        {beforeMatch}
        <span style={{ color: 'white' }}>{matchText}</span>
        {afterMatch}
      </span>
    )
  }

  return (
    <div>
      <label className={styles.formLabel}>
        {label}
        {addImportantIcon && (
          <Tooltip text={tooltipText || null}>
            <ImportantIcon />
          </Tooltip>
        )}
      </label>
      <div
        className={`${styles.container} ${isFocused ? styles.active : ''} ${
          errors.techStack ? styles.errorMsg : ''
        }`}
        onClick={focusInput}
        ref={chipsContainerRef}
        onBlur={onBlur}
      >
        <div className={styles.chipsContainer}>
          {Array.isArray(chips) &&
            chips.map((chip, index) => (
              <div key={index} className={styles.chip}>
                {chip}
                <span onClick={() => onTechRemove(chip)}>
                  <CancelIcon />
                </span>
              </div>
            ))}
          <div className={styles.sugesstionsWrapper}>
            <input
              ref={inputRef}
              type="text"
              className={styles.inputField}
              placeholder={chips.length === 0 ? placeholder : ''}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={onBlur}
              name={name}
            />

            {inputValue && (
              <div className={styles.suggestions}>
                {filteredAvailableSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={styles.suggestionItem}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {renderSuggestionItem(suggestion)}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TechStackInput
