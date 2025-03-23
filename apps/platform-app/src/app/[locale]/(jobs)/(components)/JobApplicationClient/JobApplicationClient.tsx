'use client'
import JobApplicationForm from '@/app/[locale]/(jobs)/(components)/JobApplicationForm/JobApplicationForm'
import { I18nNamespaces } from '@/i18n/request'
import { UploadProvider } from '@/contexts/UploadContext'
import { Button, Drawer, DrawerHeader } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import styles from './JobApplicationClient.module.scss'

interface JobApplicationClientProps {
    jobId: string
    jobName: string
}

const JobApplicationClient = ({ jobId, jobName }: JobApplicationClientProps) => {
    const t = useTranslations(I18nNamespaces.Jobs)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    return (
        <>
            <div className={styles.applyButtonContainer}>
                <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
                    {t('submitApplication')}
                </Button>
            </div>

            <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                <DrawerHeader>
                    <h2>{t('submitApplication')}</h2>
                    <p>{jobName}</p>
                </DrawerHeader>
                <UploadProvider>
                    <JobApplicationForm jobId={jobId} />
                </UploadProvider>
            </Drawer>
        </>
    )
}

export default JobApplicationClient 