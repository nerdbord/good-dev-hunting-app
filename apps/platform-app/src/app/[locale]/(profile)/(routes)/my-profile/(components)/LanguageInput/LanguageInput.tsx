import styles from '@/components/TechStackInput/TechStackInput.module.scss'
import languages from '@/data/languages'
import { Tooltip, type DropdownOption } from '@gdh/ui-system'
import { CancelIcon, ImportantIcon } from '@gdh/ui-system/icons'
import classNames from 'classnames/bind'
import React, { useEffect, useRef, useState } from 'react'

const cx = classNames.bind(styles)

interface LanguageInputProps {
  chips: DropdownOption[]
  onTechSelect: (lang: DropdownOption) => void
  onTechRemove: (lang: DropdownOption) => void
  placeholder: string
  name: string
  label: string
  addImportantIcon?: boolean
  tooltipText?: string | null
  errors: any
  touched: any
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
}

export const mapLanguagesToDropdownOptions = (languages: string[]) => {
  return languages.map((lang) => ({
    name: lang,
    value: lang,
  }))
}

const initialLanguage: DropdownOption = { name: '', value: '' }

export const LanguageInput: React.FC<LanguageInputProps> = ({
  chips = [],
  onTechSelect,
  onTechRemove,
  placeholder,
  name,
  label,
  addImportantIcon,
  tooltipText,
  errors,
  touched,
  handleBlur,
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chipsContainerRef = useRef(null)
  const maxChips = 16

  const [inputValue, setInputValue] = useState<DropdownOption>(initialLanguage)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    DropdownOption[]
  >([])

  useEffect(() => {
    const filtered = mapLanguagesToDropdownOptions(languages).filter((lang) =>
      lang.name.toLowerCase().startsWith(inputValue.name.toLowerCase()),
    )
    setFilteredSuggestions(filtered.slice(0, 8))
  }, [inputValue])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.name && chips.length < maxChips) {
      if (
        filteredSuggestions.find(
          (suggestion) => suggestion.name === inputValue.name,
        )
      ) {
        onTechSelect(inputValue)
        setInputValue(initialLanguage)
      }
    }
  }

  const handleSuggestionClick = (suggestion: DropdownOption) => {
    if (chips.length < maxChips) {
      onTechSelect(suggestion)
      setInputValue(initialLanguage)
      inputRef.current?.focus()
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleCustomBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(e)
    setIsFocused(false)
  }

  const filteredAvailableSuggestions = filteredSuggestions.filter(
    (suggestion) => !chips.find((chip) => chip.name === suggestion.name),
  )

  const renderSuggestionItem = (suggestion: DropdownOption) => {
    const indexOfMatch = suggestion.name
      .toLowerCase()
      .indexOf(inputValue.name.toLowerCase())
    if (indexOfMatch === -1) {
      return <span>{suggestion.name}</span>
    }
    const beforeMatch = suggestion.name.substring(0, indexOfMatch)
    const matchText = suggestion.name.substring(
      indexOfMatch,
      indexOfMatch + inputValue.name.length,
    )
    const afterMatch = suggestion.name.substring(
      indexOfMatch + inputValue.name.length,
    )
    return (
      <span>
        {beforeMatch}
        <span className={styles.matchText}>{matchText}</span>
        {afterMatch}
      </span>
    )
  }

  const getTechStackClasses = cx({
    [styles.container]: true,
    [styles.active]: isFocused,
    [styles.error]: touched.techStack && errors.techStack,
  })

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
        className={getTechStackClasses}
        onClick={focusInput}
        ref={chipsContainerRef}
      >
        <div className={styles.chipsContainer}>
          {Array.isArray(chips) &&
            chips.map((chip, index) => (
              <div key={index} className={styles.chip}>
                {chip.name}
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
              value={inputValue.name}
              onChange={(e) =>
                setInputValue({ name: e.target.value, value: e.target.value })
              }
              onKeyDown={handleKeyDown}
              onFocus={handleFocus}
              onBlur={handleCustomBlur}
              name={name}
            />

            {inputValue.name && (
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
