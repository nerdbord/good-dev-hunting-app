import React from 'react'
import styles from './ChipInputTextarea.module.scss'
import CancelIcon from '@/assets/icons/CancelIcon'
import TextArea from '../TextArea/TextArea'

interface ChipInputTextareaProps {
  chips: string
  inputValue: string
  setInputValue: (value: string) => void
  filteredSuggestions: string[]
  onTechSelect: (tech: string) => void
  onTechRemove: (tech: string) => void
}

const ChipInputTextarea: React.FC<ChipInputTextareaProps> = ({
  chips,
  inputValue,
  setInputValue,
  filteredSuggestions,
  onTechSelect,
  onTechRemove,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && inputValue) {
      onTechSelect(inputValue)
      setInputValue('')
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.chipsContainer}>
        {Array.isArray(chips) &&
          chips.map((chip, index) => (
            <div key={index} className={styles.chip}>
              {chip}
              <button onClick={() => onTechRemove(chip)}>
                <CancelIcon />
              </button>
            </div>
          ))}

        <TextArea
          label="Tech stack"
          placeholder="Start typing"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          name="techStack"
          excludeDigits={true}
          addImportantIcon={true}
          tooltipText="List the technologies you are comfortable with or interested in."
        />
      </div>
      {inputValue && (
        <div className={styles.suggestions}>
          {filteredSuggestions.map((suggestion, index) => (
            <div
              key={index}
              className={styles.suggestionItem}
              onClick={() => {
                onTechSelect(suggestion)
                setInputValue('')
              }}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ChipInputTextarea
