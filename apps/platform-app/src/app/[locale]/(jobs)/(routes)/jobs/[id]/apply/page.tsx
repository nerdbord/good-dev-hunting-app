'use client'
import JobApplicationForm from '@/app/[locale]/(jobs)/(components)/JobApplicationForm/JobApplicationForm'
import { I18nNamespaces } from '@/i18n/request'
import { Button, Drawer } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { useState } from 'react'
import { DrawerHeader } from '../../../../../../../../../../packages/ui-system/src/components/Drawer/Drawer'
import styles from '../page.module.scss'

interface JobApplicationPageProps {
  params: {
    id: string
  }
}

const JobApplicationPage = ({ params }: JobApplicationPageProps) => {
  const { id } = useParams()
  const t = useTranslations(I18nNamespaces.Jobs)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{t('applyForJob')}</h1>
          <p>Job ID: {id}</p>
        </div>
        <div className={styles.headerRight}>
          <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
            {t('submitApplication')}
          </Button>
        </div>
      </div>
      {/* TODO: job preview from job/:id page */}

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <h2>{t('submitApplication')}</h2>
          <p>JOB ID: {id}</p>
        </DrawerHeader>
        <JobApplicationForm jobId={id as string} />
      </Drawer>
    </div>
  )
}

export default JobApplicationPage
