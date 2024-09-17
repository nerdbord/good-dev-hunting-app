import { type ProfileFormValues } from '@/app/[locale]/(profile)/profile.types'
import technologies from '@/data/technologies'
import { Tooltip, type DropdownOption } from '@gdh/ui-system'
import { CancelIcon, ImportantIcon } from '@gdh/ui-system/icons'
import classNames from 'classnames/bind'
import { useFormikContext } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import styles from './TechStackInput.module.scss'

const cx = classNames.bind(styles)

interface TechStackInputProps {
  chips: DropdownOption[]
  onTechSelect: (tech: DropdownOption) => void
  onTechRemove: (tech: DropdownOption) => void
  placeholder: string
  name: string
  label: string
  addImportantIcon?: boolean
  tooltipText?: string | null
}

export const mapTechnologiesToDropdownOptions = (technologies: string[]) => {
  return technologies.map((tech) => ({
    name: tech,
    value: tech,
  }))
}

const initialTechStack: DropdownOption = { name: '', value: '' }

export const TechStackInput: React.FC<TechStackInputProps> = ({
  chips,
  onTechSelect,
  onTechRemove,
  placeholder,
  name,
  label,
  addImportantIcon,
  tooltipText,
}) => {
  const { errors, handleBlur, touched } = useFormikContext<ProfileFormValues>()
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const chipsContainerRef = useRef(null)
  const maxChips = 16

  const [inputValue, setInputValue] = useState<DropdownOption>(initialTechStack)
  const [filteredSuggestions, setFilteredSuggestions] = useState<
    DropdownOption[]
  >([])

  useEffect(() => {
    const filtered = mapTechnologiesToDropdownOptions(technologies).filter(
      (tech) =>
        tech.name.toLowerCase().startsWith(inputValue.name.toLowerCase()),
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
        setInputValue(initialTechStack)
      }
    }
  }

  const handleSuggestionClick = (suggestion: DropdownOption) => {
    if (chips.length < maxChips) {
      onTechSelect(suggestion)
      setInputValue(initialTechStack)
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
        <span style={{ color: 'white' }}>{matchText}</span>
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
