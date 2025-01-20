'use client'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import { Button, TextArea } from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { findJobByJobId } from '../../_actions/findJobByJobId'
import type { Job } from '../../jobs.types'
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormProps {
  jobId: string
  userId: string
}

const RESUMES = [
  {
    id: '1',
    name: 'CV 1',
    file: 'cv1.pdf',
  },
  {
    id: '2',
    name: 'Software Engineer Resume 2024',
    file: 'se_resume_2024.pdf',
  },
  {
    id: '3',
    name: 'Frontend Developer CV',
    file: 'frontend_cv.pdf',
  },
  {
    id: '4',
    name: 'Technical Resume',
    file: 'technical_resume.pdf',
  },
]

const JobApplicationForm = ({ jobId, userId }: JobApplicationFormProps) => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Jobs)
  const [job, setJob] = useState<Job | null>(null)
  const [messageText, setMessageText] = useState<string>()

  useEffect(() => {
    const getJob = async () => {
      const foundJob = await findJobByJobId('notImplementedYet')
      setJob(foundJob)
    }
    getJob()
  }, [])

  const hasUserAlreadyApplied = job?.usersWhoApplied.includes(userId)

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
      {({ handleSubmit, setFieldValue }) => (
        <div>
          <div className={styles.formBox}>
            {job && (
              <div className={styles.appliedStatusWrapper}>
                {hasUserAlreadyApplied ? (
                  <div className={styles.applied}>Already applied!</div>
                ) : (
                  <div className={styles.notApplied}>Not applied!</div>
                )}
              </div>
            )}
            <div className={styles.placeholder}>
              <div className={styles.cardTitle}>
                <h1>{job?.title}</h1>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>{t('projectBrief')}</h2>
                <p className={styles.brief}>{job?.brief}</p>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('requiredSkills')}</h3>
                <div className={styles.skillsList}>
                  {job?.requiredSkills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.twoColumnLayout}>
                <div className={styles.column}>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>
                      {t('scopeOfDuties')}
                    </h3>
                    <ul className={styles.listItems}>
                      {job?.scopeOfDuties.map((duty) => (
                        <li key={duty}>{duty}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>{t('benefits')}</h3>
                    <ul className={styles.listItems}>
                      {job?.benefits.map((benefit) => (
                        <li key={benefit}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={styles.column}>
                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>{t('salaryRange')}</h3>
                    <p className={styles.brief}>{job?.salaryRange}</p>
                  </div>

                  <div className={styles.section}>
                    <h3 className={styles.sectionTitle}>{t('requirements')}</h3>
                    <ul className={styles.listItems}>
                      {job?.requirements.map((requirement) => (
                        <li key={requirement}>{requirement}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('additionalInfo')}</h3>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('teamSize')}:</span>
                    <span>
                      {job?.teamSize} {t('people')}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>{t('vacancies')}:</span>
                    <span>{job?.numberOfVacancies}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.infoLabel}>
                      {t('recruitmentSteps')}:
                    </span>
                    <span>{job?.recruitmentSteps}</span>
                  </div>
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  {t('letThemKnowAboutYou')}
                </h3>
                <TextArea
                  name="messageEmployer"
                  label=""
                  placeholder={t('messageToEmployer')}
                  value={messageText || ''}
                  onChange={(e) => setMessageText(e.target.value)}
                ></TextArea>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{t('selectResume')}</h3>
                <p className={styles.sectionDescription}>
                  {t('selectResumeDescription')}
                </p>
                <div className={styles.resumeSelectionGrid}>
                  <div className={styles.existingResumes}>
                    <h4 className={styles.subsectionTitle}>{t('existingResumes')}</h4>
                    <div className={styles.resumeList}>
                      {RESUMES.map((resume) => (
                        <label key={resume.id} className={styles.resumeItem}>
                          <input
                            type="radio"
                            name="resume"
                            value={resume.id}
                            onChange={(e) => setFieldValue('resume', resume)}
                          />
                          <span className={styles.resumeName}>{resume.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className={styles.uploadResume}>
                    <h4 className={styles.subsectionTitle}>{t('uploadNewResume')}</h4>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFieldValue('resume', { id: 'new', name: file.name, file });
                        }
                      }}
                    />
                  </div>
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
