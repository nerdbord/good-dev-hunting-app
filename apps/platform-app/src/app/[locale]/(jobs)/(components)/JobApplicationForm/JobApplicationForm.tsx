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
import { Formik } from 'formik'
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
    resume: null,
  }

  const handleSubmit = async (values: typeof initialValues) => {
    if (!user?.profileId) {
      throw new Error('User profile not found')
    }
    // TODO: Implement job application logic

    console.log(cvFormData?.get('cvFileUpload'))
    const res = await uploadCVdocumentFile(cvFormData as FormData)
    const profile = await updateProfile(user?.profileId, {
      cvUrl: res.cvUrl,
    })
    console.log(res)
    console.log('Applying for job:', jobId, values)
    router.push(getJobRoute(jobId))
    console.log(profile)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({ handleSubmit }) => (
        <div>
          <div className={styles.formBox}>
            <label htmlFor="applicationMsg">{t('applicationMsgLabel')}</label>
            <div className={styles.editorWrapper}>
              <BioTextArea
                placeholder={t('applicationMsgPlaceholder')}
                value={''}
                name={'applicationMsg'}
                onChange={(e) => {
                  console.log(e.target.value)
                }}
              />
            </div>
          </div>
          <Button
            variant="primary"
            onClick={() => handleSubmit()}
            dataTestId="submitJobApplication"
          >
            {t('submitApplication')}
          </Button>
          <p>Podaj budzet</p>
          <TextInput
            onChange={(e) => {
              console.log(e.target.value)
            }}
          />
          <CVUploader />
        </div>
      )}
    </Formik>
  )
}

export default JobApplicationForm
