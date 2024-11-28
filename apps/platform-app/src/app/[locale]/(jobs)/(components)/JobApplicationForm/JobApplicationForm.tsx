'use client'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormProps {
  jobId: string
}

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Jobs)

  const initialValues = {
    message: '',
    resume: null,
  }

  const handleSubmit = async (values: typeof initialValues) => {
    // TODO: Implement job application logic
    console.log('Applying for job:', jobId, values)
    router.push(getJobRoute(jobId))
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <div className={styles.wrapper}>
          <div className={styles.formBox}>
            <div className={styles.placeholder}>
              {t('applicationFormComingSoon')}
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            dataTestId="submitJobApplication"
          >
            {t('submitApplication')}
          </Button>
        </div>
      )}
    </Formik>
  )
}

export default JobApplicationForm
