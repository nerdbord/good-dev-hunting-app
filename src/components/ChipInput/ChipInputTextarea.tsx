'use client'
import React, { useState, useEffect } from 'react'
import styles from './ChipInputTextarea.module.scss'
import technologies from '@/data/frontend/technologies/data'
import CancelIcon from '@/assets/icons/CancelIcon'

const ChipInputTextarea = () => {
  const [chips, setChips] = useState<string[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      if (
        filteredSuggestions.includes(inputValue) &&
        !chips.includes(inputValue)
      ) {
        setChips([...chips, inputValue])
      }
      setInputValue('')
    }
  }

  const removeChip = (chipToRemove: string) => {
    setChips(chips.filter((chip) => chip !== chipToRemove))
  }

  useEffect(() => {
    const filtered = technologies.filter((tech) =>
      tech.toLowerCase().startsWith(inputValue.toLowerCase()),
    )
    setFilteredSuggestions(filtered.slice(0, 8))
  }, [inputValue])

  return (
    <div>
      Tech Stack
      <div className={styles.container}>
        <div className={styles.chipsContainer}>
          {chips.map((chip) => (
            <div key={chip} className={styles.chip}>
              {chip}
              <button onClick={() => removeChip(chip)}>
                <CancelIcon />
              </button>
            </div>
          ))}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.inputField}
          />
        </div>
        {inputValue && (
          <div className={styles.suggestions}>
            {filteredSuggestions.map((suggestion) => (
              <div
                key={suggestion}
                className={styles.suggestionItem}
                onClick={() => {
                  if (!chips.includes(suggestion)) {
                    setChips([...chips, suggestion])
                  }
                  setInputValue('')
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChipInputTextarea
