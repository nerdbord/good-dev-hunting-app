'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button, TextArea } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { saveToDatabase } from '../../(routes)/jobs/actions/actions'
import { useJobApplicationChat } from '../../(routes)/jobs/add/utils/ChatBotContext'

import styles from './JobApplicationChat.module.scss'

export function JobApplicationChat() {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.JobApplicationChat)
  const chatBot = useJobApplicationChat()
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setInput('')
    setIsLoading(true)

    if (!input.trim()) {
      const { id: formId } = await saveToDatabase({})
      router.push(`/jobs/${formId}`)
    }

    try {
      await chatBot.handleMessage(input)
      const formData = chatBot.getFormData()

      const { id: formId } = await saveToDatabase(formData)
      router.push(`/jobs/${formId}`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>{'Hunty - AI Assistant'}</div>
        <div className={styles.instructionBox}>
          <p>{t('instruction1')}</p>
          <p>{t('instruction2')}</p>
        </div>
      </div>
      <form className={styles.right} onSubmit={handleSubmit}>
        <TextArea
          placeholder={t('placeholder')}
          value={input}
          onChange={handleChange}
          name={''}
          maxLength={1500}
          label=""
        />
        <div className={styles.submitButton}>
          <Button variant="primary" type="submit" loading={isLoading}>
            {t('button')}
          </Button>
        </div>
      </form>
    </div>
  )
}
