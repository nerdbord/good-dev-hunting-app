'use client'

import { ProgressBar } from '@/components/ProgressBar/ProgressBar'
import { useModal } from '@/contexts/ModalContext'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { publishJobAction } from '../../_actions/mutations/publishJob'
import { type JobModel } from '../../_models/job.model'
import { storePendingPublishJob } from '../../_utils/job-storage.client'
import { JobDetailsBasicInfo } from '../JobDetailsBasicInfo/JobDetailsBasicInfo'
import { JobDetailsDetailsInfo } from '../JobDetailsMainInfo.tsx/JobDetailsDetailsInfo'
import { LoginModal } from '../LoginModal/LoginModal'
import styles from './JobDetails.module.scss'

interface JobDetailsProps {
  job: JobModel
  params: {
    id: string
    isUser: boolean
    isJobOwner: boolean
  }
}

export default function JobDetails({ job, params }: JobDetailsProps) {
  const router = useRouter()
  const tButtons = useTranslations(I18nNamespaces.Buttons)
  const [isPublishing, setIsPublishing] = useState(false)
  const { showModal, closeModal } = useModal()

  // Check if the job is anonymous (has no createdById)
  const isAnonymousJob = !job.createdById

  // Extract the job technologies for the AvatarsDisplay
  const jobTechnologies = job.techStack.map((tech) => tech.name)

  const handleEdit = () => {
    // Allow editing if:
    // 1. The user is the job owner, OR
    // 2. The job is anonymous (no owner)
    if (!isAnonymousJob && !params.isJobOwner) {
      showModal(<LoginModal closeModal={closeModal} />, 'narrow')
    } else {
      router.push(`${AppRoutes.jobs}/${params.id}/edit`)
    }
  }

  const handlePublish = async () => {
    // For non-logged in users, store the job ID and show login modal
    if (!params.isUser) {
      // Store job ID in localStorage before showing login modal
      storePendingPublishJob(params.id)

      // Show the login modal instead of redirecting
      showModal(<LoginModal closeModal={closeModal} />, 'narrow')
      return
    }

    // For anonymous jobs, allow the current logged-in user to claim and publish
    if (!isAnonymousJob && !params.isJobOwner) {
      showModal(
        <div>
          <h2>Permission Denied</h2>
          <p>Only the job owner can publish this job.</p>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </div>,
        'narrow',
      )
      return
    }

    try {
      setIsPublishing(true)
      await publishJobAction(params.id)
      router.push(`${AppRoutes.jobs}/${params.id}`)
      router.refresh() // Refresh the page to show updated status
    } catch (error) {
      console.error('Error publishing job:', error)
      showModal(
        <div>
          <h2>Publishing Failed</h2>
          <p>There was an error publishing this job. Please try again.</p>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </div>,
        'narrow',
      )
    } finally {
      setIsPublishing(false)
    }
  }

  // Job is editable if:
  // 1. User is the job owner, OR
  // 2. Job is anonymous (no owner)
  const isEditable = params.isJobOwner || isAnonymousJob

  // Show the publish button if:
  // 1. Job is in DRAFT state AND
  // 2. Either the user is the owner OR the job is anonymous
  const showPublishButton =
    job.state === 'DRAFT' && (params.isJobOwner || isAnonymousJob)

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.actions}></ul>
        <div className={styles.jobDetailsContainerPlusAvatars}>
          <JobDetailsBasicInfo job={job} />
        </div>
      </section>
      <JobDetailsDetailsInfo job={job} />

      <ProgressBar currentStep={5} maxSteps={5}>
        <Button
          variant="secondary"
          disabled={!isEditable || isPublishing}
          onClick={handleEdit}
        >
          {tButtons('edit')}
        </Button>
        {showPublishButton && (
          <Button
            variant="primary"
            type="submit"
            disabled={isPublishing}
            onClick={handlePublish}
          >
            {isPublishing ? 'Publishing...' : tButtons('publishJob')}
          </Button>
        )}
      </ProgressBar>
    </>
  )
}
