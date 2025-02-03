'use client'
import { uploadCVdocumentFile } from '@/app/(files)/_actions/uploadCVdocumentFile'
import { CVUploader } from '@/app/[locale]/(profile)/(components)/CVuploader/CvUploader'
import { updateProfile } from '@/app/[locale]/(profile)/_actions/mutations/updateProfile'
import BioTextArea from '@/components/TextArea/BioTextArea'
import TextInput from '@/components/TextInput/TextInput'
import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Field, Form, Formik, type FormikHelpers } from 'formik'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormProps {
  jobId: string
}

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const user = session?.user

  const t = useTranslations(I18nNamespaces.Jobs)
  const { cvFormData } = useUploadContext()

  const initialValues = {
    message: '',
    budget: '',
    cvUrl: '',
  }

  const handleSubmit = async (
    values: typeof initialValues,
    { setFieldValue, setSubmitting }: FormikHelpers<typeof initialValues>,
  ) => {
    if (!user?.profileId) {
      throw new Error('User profile not found')
    }

    try {
      const res = await uploadCVdocumentFile(cvFormData as FormData)
      await updateProfile(user.profileId, { cvUrl: res.cvUrl })

      await setFieldValue('cvUrl', res.cvUrl)

      // Create final values object with updated cvUrl
      const finalValues = {
        ...values,
        cvUrl: res.cvUrl,
      }

      console.log('Applying for job:', jobId, finalValues)
      router.push(getJobRoute(jobId))
    } catch (error) {
      console.error('Error applying for job:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit, handleChange, values }) => (
        <Form>
          <div className={styles.formBox}>
            <label htmlFor="applicationMsg">{t('applicationMsgLabel')}</label>
            <div className={styles.editorWrapper}>
              <Field
                as={BioTextArea}
                placeholder={t('applicationMsgPlaceholder')}
                name="message"
                value={values.message}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formBox}>
            <label htmlFor="budget">{t('applicationBudgetLabel')}</label>
            <Field as={TextInput} name="budget" onChange={handleChange} />
          </div>
          <CVUploader />
          <Button
            variant="primary"
            type="submit"
            dataTestId="submitJobApplication"
          >
            {t('submitApplication')}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default JobApplicationForm
