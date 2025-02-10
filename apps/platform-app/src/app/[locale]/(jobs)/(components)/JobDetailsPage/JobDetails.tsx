'use client'

import { ProgressBar } from '@/components/hunter-landing/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { AvatarsDisplay } from '../AvatarsDisplay/AvatarsDisplay'
import { JobDetailsBasicInfo } from '../JobDetailsBasicInfo/JobDetailsBasicInfo'
import { JobDetailsDetailsInfo } from '../JobDetailsMainInfo.tsx/JobDetailsDetailsInfo'
import styles from './JobDetails.module.scss'

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const tButtons = useTranslations(I18nNamespaces.Buttons)

  const handleEdit = () => {
    router.push(`${AppRoutes.jobs}/${params.id}/edit`)
  }

  const handlePublish = () => {
    console.log('Publishing job:', params.id)
  }

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.actions}></ul>
        <div className={styles.jobDetailsContainerPlusAvatars}>
          <AvatarsDisplay />
          <JobDetailsBasicInfo />
        </div>
      </section>
      <JobDetailsDetailsInfo />

      <ProgressBar currentStep={5} maxSteps={5}>
        <Button variant="secondary" disabled={false} onClick={handleEdit}>
          {tButtons('edit')}
        </Button>
        <Button
          variant="primary"
          type="submit"
          disabled={false}
          onClick={handlePublish}
        >
          {tButtons('publishJob')}
        </Button>
      </ProgressBar>
    </>
  )
}
