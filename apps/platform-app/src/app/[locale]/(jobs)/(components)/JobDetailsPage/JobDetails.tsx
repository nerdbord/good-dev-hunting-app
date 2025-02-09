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

  const t = useTranslations(I18nNamespaces.Jobs)
  const tButtons = useTranslations(I18nNamespaces.Buttons)

  const handleEdit = () => {
    router.push(`${AppRoutes.jobs}/${params.id}/edit`)
  }

  const handleDelete = () => {
    // Implementacja usuwania - na razie tylko console.log
    console.log('Deleting job:', params.id)
  }

  // const handlePublish = () => {
  //   // Implementacja publikowania - na razie tylko console.log
  //   console.log('Publishing job:', params.id)
  // }

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.actions}>
          {/* <li>
            <Button variant="secondary" onClick={handleDelete}>
              {tButtons('deleteJob')}
            </Button>
          </li>
          <li>
            <Button variant="primary" onClick={handleEdit}>
              {tButtons('edit')}
            </Button>
          </li> */}

          {/* <li>
            <Button variant="primary" onClick={handlePublish}>
              {tButtons('postJob')}
            </Button>
          </li> */}
        </ul>
        <div className={styles.jobDetailsContainerPlusAvatars}>
          <AvatarsDisplay />
          <JobDetailsBasicInfo />
        </div>
      </section>
      <JobDetailsDetailsInfo />

      <ProgressBar currentStep={5} maxSteps={5}>
        <Button variant="secondary" disabled={false}>
          {tButtons('edit')}
        </Button>
        <Button variant="primary" type="submit" disabled={false}>
          {tButtons('publishJob')}
        </Button>
      </ProgressBar>
    </>
  )
}
