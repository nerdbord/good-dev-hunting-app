import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import styles from './page.module.scss'
import ProfileTopBar from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileTopBar/ProfileTopBar'
import ProfileMain from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileMain/ProfileMain'
import ProfileDetails from '@/app/[locale]/(profile)/(components)/MyProfile/ProfileDetails/ProfileDetails'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { redirect } from 'next/navigation'
import { AppRoutes } from '@/utils/routes'
import { Container } from '@gdh/ui-system'
import { findApplicationById } from '@/app/[locale]/(applications)/_models/mock'
import { ApplicationStatus } from '@/app/[locale]/(applications)/_models/application.types'
import { ApplicationActions } from '../../../(components)/ApplicationActions/ApplicationActions'
import { ApplicationTimeline } from '../../../(components)/ApplicationTimeline/ApplicationTimeline'

interface ApplicationPageProps {
  params: {
    id: string
  }
}

const ApplicationPage = async ({ params }: ApplicationPageProps) => {
  const t = await getTranslations(I18nNamespaces.Applications)
  const { user } = await getAuthorizedUser()

  if (!user) {
    redirect(AppRoutes.profilesList)
  }

  const application = await findApplicationById(params.id)

  if (!application) {
    redirect(AppRoutes.home)
  }

  // Mock timeline events
  const timelineEvents = [
    {
      status: 'pending' as ApplicationStatus,
      date: application.appliedAt,
      feedback: application.coverLetter,
    },
  ]

  const handleStatusChange = async (status: ApplicationStatus, feedback: string) => {
    // TODO: Implement status change logic
    console.log('Status changed:', status, feedback)
  }

  return (
    <Container>
      <div className={styles.applicationHeader}>
        <h1>{application.job.title}</h1>
        <div className={styles.applicationMeta}>
          <span>Company: {application.job.company}</span>
          <span>Location: {application.job.location}</span>
          <span>Status: {application.status}</span>
          <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
          {application.job.salary && (
            <span>
              Salary: {application.job.salary.min.toLocaleString()} - {application.job.salary.max.toLocaleString()} {application.job.salary.currency}
            </span>
          )}
        </div>
      </div>

      <div className={styles.applicationContent}>
        <div className={styles.profileSection}>
          {/* <ProfileTopBar profileId={application.profileId} /> */}
          <ProfileMain profileId={application.profileId} />
          <ProfileDetails profileId={application.profileId} />
        </div>

        <div className={styles.reviewSection}>
          <ApplicationActions
            applicationId={application.id}
            currentStatus={application.status}
          />
          <ApplicationTimeline events={timelineEvents} />
        </div>
      </div>
    </Container>
  )
}

export default ApplicationPage
