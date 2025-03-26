'use client'

import { useModal } from '@/contexts/ModalContext'
import { Button } from '@gdh/ui-system'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { publishJobAction } from '../../_actions/mutations/publishJob'
import {
  clearPendingPublishJob,
  getPendingPublishJob,
} from '../../_utils/job-storage.client'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

export const PendingJobPublisher = ({ isUser }: { isUser: boolean }) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { showModal, closeModal } = useModal()
  const t = useTranslations(I18nNamespaces.AddJobSuccessModal)

  useEffect(() => {
    const publishParam = searchParams.get('publish')
    const pendingJobId = getPendingPublishJob()

    // Only proceed if:
    // 1. User is logged in
    // 2. There's a pending job ID stored
    // 3. The URL has a publish=true parameter
    if (isUser && pendingJobId && publishParam === 'true' && !isProcessing) {
      const publishPendingJob = async () => {
        setIsProcessing(true)
        try {
          // Attempt to publish the job
          await publishJobAction(pendingJobId)

          // Clear the pending job ID from storage
          clearPendingPublishJob()

          // Show success message
          showModal(
            <div>
              <h2>{t('title')}</h2>
              <p>{t('description')}</p>
              <Button
                variant="primary"
                onClick={() => {
                  closeModal()
                  // Remove the publish parameter from URL
                  router.replace(`/jobs/${pendingJobId}`)
                  router.refresh()
                }}
              >
                {t('closeBtn')}
              </Button>
            </div>,
            'narrow',
          )
        } catch (error) {
          console.error('Error publishing job after login:', error)
          // Show error message
          showModal(
            <div>
              <h2>Publishing Failed</h2>
              <p>There was an error publishing your job. Please try again.</p>
              <Button
                variant="primary"
                onClick={() => {
                  closeModal()
                  // Remove the publish parameter from URL
                  router.replace(`/jobs/${pendingJobId}`)
                }}
              >
                Close
              </Button>
            </div>,
            'narrow',
          )
        } finally {
          setIsProcessing(false)
        }
      }

      publishPendingJob()
    }
  }, [isUser, searchParams, router, showModal, closeModal, isProcessing])

  // This is a utility component that doesn't render anything visible
  return null
}
