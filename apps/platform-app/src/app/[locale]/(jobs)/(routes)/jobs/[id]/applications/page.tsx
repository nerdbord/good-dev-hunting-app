import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { getJobApplications } from '@/app/[locale]/(jobs)/_actions/queries/getJobApplications'
import { findJobById } from '@/app/[locale]/(jobs)/_actions/queries/getJobById'
import { findMyJobs } from '@/app/[locale]/(jobs)/_actions/queries/getMyJobs'
import { AppRoutes } from '@/utils/routes'
import { PublishingState } from '@prisma/client'
import { notFound, redirect } from 'next/navigation'
import Header from './components/Header'
import JobApplicationsClient from './components/JobApplicationsClient'
import styles from './page.module.scss'
import { type Applicant } from './types'

const getDaysPublished = (createdAt: Date): number => {
  const diffTime = Math.abs(new Date().getTime() - createdAt.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

const convertJobStatus = (
  status: PublishingState,
): 'PENDING' | 'ACTIVE' | 'CLOSED' => {
  switch (status) {
    case PublishingState.APPROVED:
      return 'ACTIVE'
    case PublishingState.PENDING:
    case PublishingState.DRAFT:
      return 'PENDING'
    case PublishingState.REJECTED:
      return 'CLOSED'
    default:
      return 'PENDING'
  }
}

export default async function JobApplicationsPage({
  params,
}: {
  params: { id: string; locale: string }
}) {
  const jobId = params.id

  const { user } = await getAuthorizedUser()
  if (!user?.id) {
    redirect(AppRoutes.signIn)
  }

  const usersJobs = await findMyJobs()
  const isUsersJob = usersJobs.some((job) => job.id === jobId)
  if (!isUsersJob) {
    redirect(AppRoutes.myJobs)
  }

  const jobData = await findJobById(jobId)
  if (!jobData) {
    notFound()
  }

  const job = {
    id: jobData.id,
    title: jobData.jobName,
    status: jobData.state,
    createdAt: new Date(jobData.createdAt),
  }

  const applications = await getJobApplications(jobId)

  const initialApplicants: Applicant[] = applications.map((app) => ({
    id: app.id,
    name: app.name,
    title: app.title,
    lastMessage: app.lastMessage,
    lastMessageTime: app.lastMessageTime,
    avatar: app.avatar,
    messages: app.messages.map((msg) => ({
      id: msg.id,
      sender: msg.sender,
      content: msg.content,
      timestamp: new Date(msg.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      }),
    })),
  }))

  const initialSelectedApplicant =
    initialApplicants.length > 0 ? initialApplicants[0] : null

  return (
    <div className={styles.pageWrapper}>
      <Header
        jobTitle={job.title}
        jobStatus={convertJobStatus(job.status)}
        applicantCount={initialApplicants.length}
        daysPublished={getDaysPublished(job.createdAt)}
      />
      <JobApplicationsClient
        jobId={jobId}
        initialApplicants={initialApplicants}
        initialSelectedApplicant={initialSelectedApplicant}
      />
    </div>
  )
}
