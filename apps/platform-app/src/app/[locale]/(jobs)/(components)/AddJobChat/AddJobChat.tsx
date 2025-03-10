'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { saveToDatabase } from '../../_actions/actions'

import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import styles from './AddJobChat.module.scss'

export function AddJobChat() {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.AddJobChat)
  const tButtons = useTranslations(I18nNamespaces.Buttons)
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
      router.push(`/jobs/${formId}/edit`)
    }

    try {
      const { id: formId } = await saveToDatabase({})
      router.push(`/jobs/${formId}/edit`)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.descriptionBox}>
          <div className={styles.descriptionHeader}>
            {t('descriptionHeader')}
          </div>
          <div className={styles.descriptionParagraph}>
            <p>{t('descriptionParagraph')}</p>
          </div>
        </div>
        <form className={styles.chatbotForm}>
          <label className={styles.textareaLabel} htmlFor="applicationChatbot">
            {t('textareaLabel')}
          </label>
          <textarea
            placeholder={t('placeholder')}
            value={input}
            onChange={handleChange}
            maxLength={1500}
            id="applicationChatbot"
            className={`${styles.chatbotTextarea} ${
              input.trim() ? styles.typed : ''
            }`}
          />
        </form>
      </div>

      <ProgressBar currentStep={1} maxSteps={3}>
        <Button
          variant="secondary"
          disabled={isLoading}
          onClick={() => router.back()}
        >
          {tButtons('goBack')}
        </Button>
        <Button
          variant="primary"
          onClick={handleSubmit}
          type="submit"
          disabled={isLoading}
        >
          {tButtons('goNext')}
        </Button>
      </ProgressBar>
    </>
  )
}
