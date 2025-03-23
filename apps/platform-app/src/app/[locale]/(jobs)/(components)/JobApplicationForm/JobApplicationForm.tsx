'use client'
import { uploadCVdocumentFile } from '@/app/(files)/_actions/uploadCVdocumentFile'
import { CVuploaderForm } from '@/app/[locale]/(profile)/(components)/CVuploader/CvUploaderForm'
import { findProfileById } from '@/app/[locale]/(profile)/_actions'
import { updateProfile } from '@/app/[locale]/(profile)/_actions/mutations/updateProfile'
import type { ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import BioTextArea from '@/components/TextArea/BioTextArea'
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
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormProps {
  jobId: string
  jobName: string
}

const JobApplicationForm = ({ jobId, jobName }: JobApplicationFormProps) => {
  const router = useRouter()
  const { data: session } = useSession()
  const profileId = session?.user.profileId
  const [profile, setProfile] = useState<ProfileModel | null>(null)
  const { onSetCvFormData } = useUploadContext()

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

      // Initialize cvFormData if profile has a CV URL
      if (profile.cvUrl) {
        // Create an empty FormData to indicate a CV is already available
        const dummyFormData = new FormData()
        dummyFormData.append('existingCvUrl', profile.cvUrl)
        onSetCvFormData(dummyFormData)
      }
    }
    fetchProfile()
  }, [profileId, onSetCvFormData, session.user.profileId])

  const user = session?.user
  const [serverError, setServerError] = useState<string | null>(null)
  const [cvError, setCvError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = useTranslations(I18nNamespaces.Jobs)
  const { cvFormData } = useUploadContext()

  const initialValues = {
    message: '',
    cvUrl: profile?.cvUrl || '',
  }

  const validationSchema = Yup.object({
    message: Yup.string().required(t('messageRequired')),
  })

  const handleSubmit = async (
    values: typeof initialValues,
    { setSubmitting }: FormikHelpers<typeof initialValues>,
  ) => {
    if (!cvFormData) {
      setCvError(t('cvRequired'))
      setSubmitting(false)
      return
    }

    setCvError(null)

    if (!user?.profileId) {
      setServerError(t('userProfileNotFound'))
      setSubmitting(false)
      return
    }

    setServerError(null)
    setIsSubmitting(true)

    try {
      // Default to current CV URL
      let currentCvUrl = values.cvUrl || ''

      // Check if we have a new file upload or just an existing CV URL
      const hasNewFileUpload = cvFormData.has('cvFileUpload')
      const hasExistingCvUrl = cvFormData.has('existingCvUrl')

      // If we have existingCvUrl in cvFormData but values.cvUrl is empty,
      // use the existingCvUrl from cvFormData
      if (!currentCvUrl && hasExistingCvUrl) {
        currentCvUrl = cvFormData.get('existingCvUrl') as string
      }

      // Final values to be used for job application
      let finalValues = {
        ...values,
        cvUrl: currentCvUrl,
      }

      if (hasNewFileUpload) {
        // Process new file upload
        const uploadResult = await uploadCVdocumentFile(cvFormData as FormData)

        if (!uploadResult.success || uploadResult.error) {
          setServerError(uploadResult.error || t('cvUploadFailed'))
          setSubmitting(false)
          setIsSubmitting(false)
          return
        }

        // Update profile with new CV URL
        await updateProfile(user.profileId, {
          cvUrl: uploadResult.cvUrl as string,
        })

        // Update final values with new CV URL
        finalValues = {
          ...values,
          cvUrl: uploadResult.cvUrl as string,
        }
      }

      // Ensure we have a valid CV URL before proceeding
      if (!finalValues.cvUrl) {
        setServerError(t('cvRequired'))
        setSubmitting(false)
        setIsSubmitting(false)
        return
      }

      // Submit the job application
      const applicationResult = await createJobApplication({
        jobId,
        message: finalValues.message,
        cvUrl: finalValues.cvUrl,
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
                  as={BioTextArea}
                  placeholder={t('applicationMsgPlaceholder')}
                  name="message"
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
              <CVuploaderForm btnVariant="secondary" />
              {cvError && <div className={styles.fieldError}>{cvError}</div>}
            </div>

            {cvFormData && (
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
            )}
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default JobApplicationForm
