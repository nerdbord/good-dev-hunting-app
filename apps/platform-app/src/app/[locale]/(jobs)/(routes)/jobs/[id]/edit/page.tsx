'use client'
import { CreateJobDetailsForm } from '@/app/[locale]/(jobs)/(components)/CreateJobDetailsForm/CreateJobDetailsForm'
import { mockJobDetails } from '@/app/[locale]/(jobs)/mockData'
import { ProgressBar } from '@/components/hunter-landing/ProgressBar/ProgressBar'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './page.module.scss'

export default function EditJobDetailsPage() {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Buttons)
  const handleSubmit = () => {
    console.log('submit')
    router.push(`/jobs/${id}`)
  }

  return (
    <>
      <div className={styles.container}>
        <CreateJobDetailsForm initialValues={mockJobDetails} />
        <ProgressBar currentStep={4} maxSteps={5}>
          <Button variant="secondary" disabled={false}>
            {t('goBack')}
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            type="submit"
            disabled={false}
          >
            {t('saveAndPreview')}
          </Button>
        </ProgressBar>
      </div>
    </>
  )
}
