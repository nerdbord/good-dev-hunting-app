'use client'
import JobApplicationForm from '@/app/[locale]/(jobs)/(components)/JobApplicationForm/JobApplicationForm'
import { useModal } from '@/contexts/ModalContext'
import { UploadProvider } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button, Drawer, DrawerHeader } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { LoginToApplyModal } from '../LoginToApplyModal/LoginToApplyModal'

interface JobApplicationClientProps {
  jobId: string
  jobName: string
  isUser: boolean
}

const JobApplicationClient = ({
  jobId,
  jobName,
  isUser,
}: JobApplicationClientProps) => {
  const t = useTranslations(I18nNamespaces.Jobs)
  const { showModal } = useModal()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleOpenDrawer = async () => {
    if (!isUser) {
      showModal(<LoginToApplyModal />, 'narrow')
      return
    }
    setIsDrawerOpen(true)
  }

  return (
    <>
      <Button
        variant="primary"
        type={'button'}
        onClick={() => handleOpenDrawer()}
      >
        {t('submitApplication')}
      </Button>

      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <DrawerHeader>
          <h2>{t('submitApplication')}</h2>
          <p>{jobName}</p>
        </DrawerHeader>
        <UploadProvider>
          <JobApplicationForm jobId={jobId} jobName={jobName} />
        </UploadProvider>
      </Drawer>
    </>
  )
}

export default JobApplicationClient
