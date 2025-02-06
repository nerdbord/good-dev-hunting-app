'use client'

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

  const handleDelete = () => {
    // Implementacja usuwania - na razie tylko console.log
    console.log('Deleting job:', params.id)
  }

  return (
    <>
      <section className={styles.container}>
        <ul className={styles.actions}>
          <li>
            <Button variant="secondary" onClick={handleDelete}>
              {tButtons('deleteJob')}
            </Button>
          </li>
          <li>
            <Button variant="primary" onClick={handleEdit}>
              {tButtons('edit')}
            </Button>
          </li>
        </ul>
        <div className={styles.jobDetailsContainer}>
          <JobDetailsBasicInfo />
          <AvatarsDisplay />
        </div>
      </section>
      <JobDetailsDetailsInfo />
    </>
  )
} 