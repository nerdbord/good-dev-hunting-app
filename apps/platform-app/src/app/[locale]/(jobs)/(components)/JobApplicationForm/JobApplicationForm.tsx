'use client'
import { uploadCVdocumentFile } from '@/app/(files)/_actions/uploadCVdocumentFile'
import { CVuploaderForm } from '@/app/[locale]/(profile)/(components)/CVuploader/CvUploaderForm'
import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { updateProfile } from '@/app/[locale]/(profile)/_actions/mutations/updateProfile'
import type { ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { useUploadContext } from '@/contexts/UploadContext'
import { I18nNamespaces } from '@/i18n/request'
import { AppRoutes } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Field, Form, Formik, type FormikHelpers } from 'formik'
import { useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import * as Yup from 'yup'
import { createJobApplication } from '../../_actions/mutations/createJobApplication'
import { ProjectBriefTextArea } from '../ProjectBriefTextArea/ProjectBriefTextArea'
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormValues {
  message: string
  cvUrl: string
}

interface JobApplicationFormProps {
  jobId: string
  jobName: string
}

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const profileId = session?.user.profileId
  const [profile, setProfile] = useState<ProfileModel | null>(null)
  const { cvFormData } = useUploadContext()

  if (!session?.user.profileId) {
    redirect(AppRoutes.createProfile)
  }

  useEffect(() => {
    const fetchProfile = async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const profile = await findProfileById(session.user.profileId!)
      if (!profile) {
        redirect(AppRoutes.createProfile)
      }
      setProfile(profile)
    }
    fetchProfile()
  }, [profileId, session.user.profileId])

  const user = session?.user
  const [serverError, setServerError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = useTranslations(I18nNamespaces.Jobs)

  const initialValues: JobApplicationFormValues = {
    message: '',
    cvUrl: profile?.cvUrl || '',
  }

  const validationSchema = Yup.object({
    message: Yup.string().required(t('messageRequired')),
  })

  const handleSubmit = async (
    values: JobApplicationFormValues,
    { setSubmitting }: FormikHelpers<JobApplicationFormValues>,
  ) => {
    setServerError(null)
    setIsSubmitting(true)

    try {
      if (!user?.profileId) {
        setServerError(t('userProfileNotFound'))
        setSubmitting(false)
        setIsSubmitting(false)
        return
      }

      // Initialize CV URL with existing profile CV
      let finalCvUrl = values.cvUrl || ''

      // Process new CV upload if available
      if (cvFormData) {
        const uploadResult = await uploadCVdocumentFile(cvFormData)

        if (!uploadResult.success || uploadResult.error) {
          setServerError(uploadResult.error || t('cvUploadFailed'))
          setSubmitting(false)
          setIsSubmitting(false)
          return
        }

        // Update finalCvUrl with the newly uploaded file
        finalCvUrl = uploadResult.cvUrl as string

        // Update user profile with new CV URL
        await updateProfile(user.profileId, {
          cvUrl: finalCvUrl,
        })
      }

      // Submit the job application
      const applicationResult = await createJobApplication({
        jobId,
        message: values.message,
        cvUrl: finalCvUrl,
      })

      if (!applicationResult.success) {
        setServerError(
          applicationResult.error || t('applicationSubmissionFailed'),
        )
        setSubmitting(false)
        setIsSubmitting(false)
        return
      }

      // Redirect to inbox after successful application
      router.push(AppRoutes.inbox)
    } catch (error) {
      console.error('Error applying for job:', error)
      setServerError(
        typeof error === 'string' ? error : t('applicationSubmissionFailed'),
      )
      setIsSubmitting(false)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      {serverError && <div className={styles.errorMessage}>{serverError}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={true}
        validateOnMount={false}
        enableReinitialize={true}
      >
        {({
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting: formSubmitting,
          setFieldTouched,
        }) => (
          <Form>
            <div className={styles.formBox}>
              <label htmlFor="message">{t('applicationMsgLabel')}</label>
              <div className={styles.editorWrapper}>
                <Field
                  as={ProjectBriefTextArea}
                  name="message"
                  placeholder={t('applicationMsgPlaceholder')}
                  disabled={formSubmitting || isSubmitting}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setFieldTouched('message', true, false)
                    handleChange(e)
                  }}
                  onBlur={handleBlur}
                />
                {errors.message && touched.message && (
                  <div className={styles.fieldError}>{errors.message}</div>
                )}
              </div>
            </div>

            <div className={styles.formBox}>
              <p>CV</p>
              <CVuploaderForm btnVariant="secondary" />
              <p className={styles.warnChangeCvFile}>{t('warnChangeCvFile')}</p>
            </div>

            <div className={styles.maxWidthButton}>
              <Button
                variant="primary"
                type="submit"
                dataTestId="submitJobApplication"
                disabled={formSubmitting || isSubmitting}
              >
                {formSubmitting || isSubmitting
                  ? t('submitting')
                  : t('submitApplication')}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default JobApplicationForm
