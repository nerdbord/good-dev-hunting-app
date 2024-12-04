'use client'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './PostJobForm.module.scss'

const PostJobForm = () => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Jobs)

  const initialValues = {
    title: '',
    description: '',
  }

  const handleSubmit = async (values: typeof initialValues) => {
    // Mock job creation - in real implementation this would be an API call
    const mockJobId = 'job-' + Math.random().toString(36).substr(2, 9)

    // Redirect to job details page using the helper function
    router.push(getJobRoute(mockJobId))
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <div className={styles.wrapper}>
          <div className={styles.formBox}>
            <div className={styles.placeholder}>{t('comingSoon')}</div>
          </div>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            dataTestId="submitJobPost"
          >
            {t('submit')}
          </Button>
        </div>
      )}
    </Formik>
  )
}

export default PostJobForm
