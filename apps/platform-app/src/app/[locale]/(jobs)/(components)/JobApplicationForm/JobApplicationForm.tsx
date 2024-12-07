'use client'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import { Button } from '@gdh/ui-system'
import { Formik, useFormikContext } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import styles from './JobApplicationForm.module.scss'
import { useEffect, useState } from 'react'
import type { Job } from '../../jobs.types'
import { findJobByJobId } from '../../_actions/findJobByJobID'

interface JobApplicationFormProps {
  jobId: string
}

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Jobs)
  const [job, setJob] = useState<Job | null>(null)

  useEffect(() => {
    const getJob = async () => {
      const foundJob = await findJobByJobId("notImplementedYet");
      setJob(foundJob)
    }
    getJob()
  }, [])

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
        <div>
          <div className={styles.formBox}>
            <div className={styles.placeholder}>
              










            {/* <div className="min-h-screen bg-black text-white p-6"> */}
          {/* Project Brief */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Project Brief</h3>
            <p className="text-gray-400">
              We are looking for a Frontend Developer to join our team and help build modern web applications
              using React and Next.js. The ideal candidate should have strong experience with TypeScript
              and modern frontend development practices.
            </p>
          </div>

          {/* Required Skills */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["React", "TypeScript", "Next.js", "Tailwind CSS"].map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>






























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
