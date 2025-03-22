'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { useState } from 'react'
import { createJobFromDescriptionAction } from '../../_actions/mutations/createJob'

import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import styles from './AddJobChat.module.scss'
import { AddJobChatLoader } from './AddJobChatLoader'

export function AddJobChat() {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.AddJobChat)
  const tButtons = useTranslations(I18nNamespaces.Buttons)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { addToast } = useToast()

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Basic client-side validation
    if (!input.trim() || input.trim().length < 10) {
      addToast(
        'Please provide a more detailed job description.',
        ToastStatus.INVALID,
      )
      return
    }

    if (input.length > 1500) {
      addToast(
        'Job description is too long. Please limit to 1500 characters.',
        ToastStatus.INVALID,
      )
      return
    }

    setIsLoading(true)

    try {
      // Use the combined server action that handles both analysis and job creation
      const response = await createJobFromDescriptionAction(input)

      if (response.success && response.job) {
        // If job creation was successful, redirect to edit page
        router.push(`/jobs/${response.job.id}/edit`)
      } else {
        // Handle error based on the returned error details
        const errorMessage =
          response.reasoning || response.error || 'Error creating job'

        // Use a different toast type for rate limiting to make it more visible
        if (
          errorMessage.includes('Rate limit') ||
          errorMessage.includes('high demand')
        ) {
          addToast(`⚠️ ${errorMessage}`, ToastStatus.INVALID)
        } else {
          addToast(errorMessage, ToastStatus.INVALID)
        }

        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error calling server action:', error)
      // This should only happen for network errors or other unexpected issues
      addToast(
        'Error communicating with server. Please try again.',
        ToastStatus.INVALID,
      )
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <AddJobChatLoader />}
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
          <div className={styles.charCount}>{input.length}/1500</div>
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
