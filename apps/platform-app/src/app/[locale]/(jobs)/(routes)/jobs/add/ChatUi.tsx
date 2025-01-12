'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useChatBot } from './ChatBotContext'
import styles from './ChatUi.module.css'

const CONTRACT_TYPES = [
  'B2B',
  'Employment Contract',
  'Work Contract',
  'Mandate Contract',
]
const WORK_TIMES = ['Full-time', 'Part-time', 'Contract']
const WORK_MODES = ['On-site', 'Hybrid', 'Remote']

export function ChatUi() {
  const router = useRouter()
  const chatBot = useChatBot()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState<string>(
    chatBot.getMissingField().question,
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setInput('')
    setIsLoading(true)

    try {
      await chatBot.handleMessage(input, currentQuestion)

      const { question, field } = chatBot.getMissingField()
      setCurrentQuestion(question)
      if (!field) router.push('/form')
    } catch (error) {
      console.error('Error:', error)
      setCurrentQuestion('Sorry, there was an error. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleOptionSelect = (field: string, value: string) => {
    chatBot.setFormField(field, value)

    const { question, field: missingField } = chatBot.getMissingField()
    setCurrentQuestion(question)
    if (!missingField) router.push('/form')
  }

  const handleTraditionalFormClick = () => {
    router.push('/form')
  }

  const renderInput = () => {
    const { field } = chatBot.getMissingField()

    if (field === 'employmentDetails.contractType') {
      return (
        <div className={styles.optionsContainer}>
          {CONTRACT_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handleOptionSelect(field, type)}
              className={styles.optionButton}
            >
              {type}
            </button>
          ))}
        </div>
      )
    }

    if (field === 'employmentDetails.workTime') {
      return (
        <div className={styles.optionsContainer}>
          {WORK_TIMES.map((time) => (
            <button
              key={time}
              onClick={() => handleOptionSelect(field, time)}
              className={styles.optionButton}
            >
              {time}
            </button>
          ))}
        </div>
      )
    }

    if (field === 'employmentDetails.workMode') {
      return (
        <div className={styles.optionsContainer}>
          {WORK_MODES.map((mode) => (
            <button
              key={mode}
              onClick={() => handleOptionSelect(field, mode)}
              className={styles.optionButton}
            >
              {mode}
            </button>
          ))}
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your answer..."
          className={styles.input}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading} className={styles.button}>
          Send
        </button>
      </form>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.chatSection}>
        <h2
          className={`${styles.botQuestion} ${
            isLoading ? styles.thinking : ''
          }`}
        >
          {currentQuestion}
        </h2>
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

      <button
        onClick={handleTraditionalFormClick}
        className={styles.traditionalFormButton}
      >
        Fill the form in traditional way
      </button>
    </div>
  )
}
