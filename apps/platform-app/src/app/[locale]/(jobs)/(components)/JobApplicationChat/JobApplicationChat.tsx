'use client'
import { Button, TextArea } from '@gdh/ui-system'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { saveToDatabase } from '../../(routes)/jobs/actions/actions'
import { useJobApplicationChat } from '../../(routes)/jobs/add/ChatBotContext'
import styles from './JobApplicationChat.module.scss'

export function JobApplicationChat() {
  const router = useRouter()
  const chatBot = useJobApplicationChat()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    setInput('')
    setIsLoading(true)

    try {
      await chatBot.handleMessage(input)
      const formData = await chatBot.getFormData()
      await saveToDatabase(formData)
      router.push('/form')
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{'CO TO'}</div>
        <div className={styles.personalInfo}>{'INSTRUKCJA'} </div>
      </div>
      <form className={styles.right} onSubmit={handleSubmit}>
        <label className={styles.formLabel}>{'Czego potrzebujesz?'}</label>
        <TextArea
          placeholder={'WPROWADZ OPIS ZGŁOSZENIA'}
          value={input}
          onChange={handleChange}
          name={''}
          maxLength={1500}
          label=""
        />
        <div className={styles.submitButton}>
          <Button variant="primary" type="submit" loading={isLoading}>
            WYŚLIJ OPIS I PRZEJDZ DO FORMA
          </Button>
        </div>
      </form>
    </div>
  )
}
