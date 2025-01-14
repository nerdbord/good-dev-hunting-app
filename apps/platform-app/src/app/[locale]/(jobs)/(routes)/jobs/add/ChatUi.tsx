'use client'
import { Button } from '@gdh/ui-system'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useRef, useState } from 'react'
import { saveToDatabase } from '../actions/actions'
import type { EmploymentDetails } from '../actions/groq/schema'
import { useChatBot } from './ChatBotContext'
import styles from './ChatUi.module.scss'

const CONTRACT_TYPES: EmploymentDetails['contractType'][] = [
  'B2B',
  'Employment Contract',
  'Work Contract',
  'Mandate Contract',
]
const WORK_TIMES: EmploymentDetails['workTime'][] = [
  'Full-time',
  'Part-time',
  'Contract',
]
const WORK_MODES: EmploymentDetails['workMode'][] = [
  'On-site',
  'Hybrid',
  'Remote',
]

export function ChatUi() {
  const router = useRouter()
  const chatBot = useChatBot()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isTyped, setIsTyped] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    chatBot.getMissingField().question,
  )
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
    setIsTyped(event.target.value.length > 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setInput('')
    setIsLoading(true)

    try {
      await chatBot.handleMessage(input, currentQuestion)

      const { question, field } = chatBot.getMissingField()
      setCurrentQuestion(question)
      if (!field) {
        await saveToDatabase(chatBot.getFormData())
        router.push('/form')
      }
    } catch (error) {
      console.error('Error:', error)
      setCurrentQuestion('Sorry, there was an error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionSelect = async (field: string, value: string) => {
    chatBot.setFormField(field, value)

    const { question, field: missingField } = chatBot.getMissingField()
    setCurrentQuestion(question)
    if (!missingField) {
      await saveToDatabase(chatBot.getFormData())
      router.push('/form')
    }
  }

  const handleContainerClick = (e: React.MouseEvent) => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const renderInput = () => {
    const { field } = chatBot.getMissingField()

    if (field === 'employmentDetails.contractType') {
      return (
        <div className={styles.optionsContainer}>
          {CONTRACT_TYPES.map((type) => (
            <Button
              key={type}
              onClick={() => handleOptionSelect(field, type)}
              variant="standard"
            >
              {type}
            </Button>
          ))}
        </div>
      )
    }

    if (field === 'employmentDetails.workTime') {
      return (
        <div className={styles.optionsContainer}>
          {WORK_TIMES.map((time) => (
            <Button
              key={time}
              onClick={() => handleOptionSelect(field, time)}
              variant="action"
            >
              {time}
            </Button>
          ))}
        </div>
      )
    }

    if (field === 'employmentDetails.workMode') {
      return (
        <div className={styles.optionsContainer}>
          {WORK_MODES.map((mode) => (
            <Button
              key={mode}
              onClick={() => handleOptionSelect(field, mode)}
              variant="tertiary"
            >
              {mode}
            </Button>
          ))}
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <div
          className={`${styles.textareaWrapper} ${isTyped ? styles.typed : ''}`}
        >
          <textarea
            className={styles.formTextarea}
            value={input}
            placeholder={'Type your answer...'}
            onChange={handleChange}
            maxLength={2500}
            disabled={isLoading}
            ref={textareaRef}
          />
          <div
            className={styles.textareaButtonsContainer}
            onClick={handleContainerClick}
          >
            <div className={styles.textareaButtonsWrapper}>
              <Button
                type="button"
                disabled={isLoading}
                variant="action"
                onClick={() => {
                  setInput('')
                }}
              >
                Clear
              </Button>
              <Button type="submit" disabled={isLoading} variant="action">
                Send
              </Button>
            </div>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatSection}>
        <h3
          className={`${styles.botQuestion} ${
            isLoading ? styles.thinking : ''
          }`}
        >
          {currentQuestion}
        </h3>
        {renderInput()}
      </div>
      {Object.keys(chatBot.getFormData()).length > 0 && (
        <div className={styles.formDataContainer}>
          <h3 className={styles.formDataTitle}>Current Form Data:</h3>
          <pre className={styles.formDataContent}>
            {JSON.stringify(chatBot.getFormData(), null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
