'use client'
import { I18nNamespaces } from '@/i18n/request'
import { getJobRoute } from '@/utils/routes'
import {
  Button,
  Calendar,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TextArea,
} from '@gdh/ui-system'
import { Formik } from 'formik'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { findJobByJobId } from '../../_actions/findJobByJobId'
import type { Job } from '../../jobs.types'
import styles from './JobApplicationForm.module.scss'

interface JobApplicationFormProps {
  jobId: string
}

const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00']

const JobApplicationForm = ({ jobId }: JobApplicationFormProps) => {
  const router = useRouter()
  const t = useTranslations(I18nNamespaces.Jobs)
  const [job, setJob] = useState<Job | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()
  const [messageText, setMessageText] = useState<string>();

  useEffect(() => {
    const getJob = async () => {
      const foundJob = await findJobByJobId('notImplementedYet')
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
              <div className={styles.cardTitle}>
                <h1>{job?.title}</h1>
              </div>

              <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Project Brief</h2>
                <p className={styles.brief}>{job?.brief}</p>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Required Skills</h3>
                <div className={styles.skillsList}>
                  {job?.requiredSkills.map((skill) => (
                    <span key={skill} className={styles.skillTag}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>
                  Let them know more about you
                </h3>
                <TextArea
                  name="messageEmployer"
                  label=""
                  placeholder="Message to the potential employer..."
                  value={messageText || ""}
                  onChange={(e) => setMessageText(e.target.value)}
                ></TextArea>
              </div>

              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Schedule Video Call</h3>
                <div className={styles.formGrid}>
                  <Calendar availableDays={job?.videocallSlots} />
                  <Select onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
