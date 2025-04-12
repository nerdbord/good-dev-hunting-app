import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'
import { type Personalization } from 'mailersend/lib/modules/Email.module'

// Define JobModel type for email functions
type JobModel = {
  id: string
  jobName: string
  budgetType: string
  minBudgetForProjectRealisation?: number
  maxBudgetForProjectRealisation?: number
  currency?: string
  projectBrief: string
  techStack: Array<{ name: string }>
  remoteOnly: boolean
  city?: string
  country?: string
  employmentTypes: string[]
  employmentModes: string[]
  // Add other properties as needed
}

// Define ProfileModel type for sendJobProposalEmail function
type ProfileModel = {
  id: string
  email: string
  fullName: string
  // Add other properties as needed
}

export type ContactRequestEmailParams = {
  senderEmail: string
  senderFullName: string
  recipientEmail: string
  recipientFullName: string
  message: string
  subject: string
}

export const sendContactRequest = async ({
  senderEmail,
  senderFullName,
  subject,
  message,
  recipientEmail,
  recipientFullName,
}: ContactRequestEmailParams) => {
  try {
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }

    const personalization: Personalization[] = [
      {
        email: recipientEmail,
        data: {
          recipientFullName,
          senderFullName,
          message,
        },
      },
    ]

    const recipients = [new Recipient(recipientEmail)]
    await mailersendClient.sendMail({
      recipients,
      templateId: MailTemplateId.contactRequest,
      config,
      personalization,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}

export const sendProfileApprovedEmail = async (
  email: string,
  githubUsername: string,
) => {
  const templateId = MailTemplateId.profileApprovedNotification

  const personalization: Personalization[] = [
    {
      email,
      data: {
        username: githubUsername,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject: '✅ Your profile has been approved',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendProfileRejectedEmail = async (
  email: string,
  reason: string,
) => {
  const templateId = MailTemplateId.profileRejectedNotification

  const personalization: Personalization[] = [
    {
      email,
      data: {
        reason: reason,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: templateId,
    personalization,
    config: {
      subject: '⚠️Your profile has been rejected',
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendWelcomeEmail = async (email: string, username: string) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        name: username,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.welcomeMail,
    personalization,
    config: {
      subject: `Welcome to the Hunt, ${username}!`,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendMagicLinkEmail = async (email: string, url: string) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        authUrl: url,
      },
    },
  ]

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId: MailTemplateId.verificationRequest,
    personalization,
    config: {
      subject: `Welcome to the Hunt, ${email}!`,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

/**
 * Sends a notification email to job applicants about unread messages from employers
 * @param email User's email address
 * @param unreadCount Number of unread messages
 * @param username User's name or username
 * @returns Promise that resolves when the email is sent
 */
export const sendApplicantUnreadMessagesNotification = async (
  email: string,
  unreadCount: number,
  username: string,
) => {
  try {
    // Create a plain URL for the inbox
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const loginUrl = `${baseUrl}/my-profile/inbox`

    const personalization: Personalization[] = [
      {
        email,
        data: {
          username,
          unreadCount,
          loginUrl,
        },
      },
    ]

    await mailersendClient.sendMail({
      recipients: [new Recipient(email)],
      templateId: MailTemplateId.applicantUnreadMessagesNotification,
      personalization,
      config: {
        subject: `You have ${unreadCount} unread message${
          unreadCount > 1 ? 's' : ''
        } from employers`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Team',
      },
    })

    return { success: true }
  } catch (error) {
    console.error(
      'Error sending unread messages notification to applicant:',
      error,
    )
    return { success: false, error }
  }
}

/**
 * Sends a notification email to job owners about unread messages from applicants
 * @param email User's email address
 * @param unreadCount Number of unread messages
 * @param username User's name or username
 * @returns Promise that resolves when the email is sent
 */
export const sendJobOwnerUnreadMessagesNotification = async (
  email: string,
  unreadCount: number,
  username: string,
) => {
  try {
    // Create a plain URL for the jobs page
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const loginUrl = `${baseUrl}/jobs/my`

    const personalization: Personalization[] = [
      {
        email,
        data: {
          username,
          unreadCount,
          loginUrl,
        },
      },
    ]

    await mailersendClient.sendMail({
      recipients: [new Recipient(email)],
      templateId: MailTemplateId.jobOwnerUnreadMessagesNotification,
      personalization,
      config: {
        subject: `You have ${unreadCount} unread message${
          unreadCount > 1 ? 's' : ''
        } from job applicants`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Team',
      },
    })

    return { success: true }
  } catch (error) {
    console.error(
      'Error sending unread messages notification to job owner:',
      error,
    )
    return { success: false, error }
  }
}

// Define the auth user interface based on the session.user structure
interface AuthUser {
  id: string
  email: string
  avatarUrl?: string | null
  name?: string | null
  roles: string[]
  profileId?: string | null
  githubUsername?: string | null
  profileSlug?: string | null
}

/**
 * Sends a confirmation email to the job owner after their job has been published
 * Includes information about how many specialists received the job proposal
 */
export async function sendJobPublishedEmail(
  job: JobModel,
  user: AuthUser,
  matchedProfilesCount: number,
): Promise<boolean> {
  try {
    // Determine the message based on the number of matched profiles
    let matchStatusMessage = ''

    if (matchedProfilesCount === 0) {
      matchStatusMessage =
        "Currently, we don't have specialists that match your job requirements. It may take longer to receive applications, but we'll notify you as soon as we find suitable candidates."
    } else if (matchedProfilesCount === 1) {
      matchStatusMessage = `We've sent your job to 1 specialist who matches your requirements. You should start receiving applications soon.`
    } else {
      matchStatusMessage = `We've sent your job to ${matchedProfilesCount} specialists who match your requirements. You should start receiving applications soon.`
    }

    // Create plain URLs for the job and applications
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const jobUrl = `${baseUrl}/jobs/${job.id}`
    const applicationsUrl = `${baseUrl}/jobs/${job.id}/applications`

    await mailersendClient.sendMail({
      recipients: [new Recipient(user.email, user.name || 'Job Poster')],
      templateId: MailTemplateId.jobPublished,
      config: {
        subject: `Your job "${job.jobName}" has been published!`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Jobs',
      },
      personalization: [
        {
          email: user.email,
          data: {
            recipient_name: user.name || 'there',
            job_title: job.jobName,
            job_url: jobUrl,
            matches_status: matchStatusMessage,
            matched_count: matchedProfilesCount.toString(),
            applications_url: applicationsUrl,
            current_year: new Date().getFullYear().toString(),
          },
        },
      ],
    })

    console.log(
      `Job published confirmation email sent to ${user.email} for job ${job.id}`,
    )
    return true
  } catch (error) {
    console.error('Error sending job published email:', error)
    return false
  }
}

/**
 * Sends a notification email to a job owner when someone applies for their job
 * @param ownerEmail Job owner's email address
 * @param ownerName Job owner's name
 * @param applicantName Name of the applicant
 * @param jobTitle Job title that was applied for
 * @param applicationUrl URL to view the application
 * @returns Promise that resolves when the email is sent
 */
export const sendNewApplicationNotificationToOwner = async (
  ownerEmail: string,
  ownerName: string,
  applicantName: string,
  jobTitle: string,
  applicationUrl: string,
) => {
  try {
    // Use the plain application URL directly
    const personalization: Personalization[] = [
      {
        email: ownerEmail,
        data: {
          ownerName,
          applicantName,
          jobTitle,
          applicationUrl,
          // Add current date formatted as "Month Day, Year"
          applicationDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      },
    ]

    await mailersendClient.sendMail({
      recipients: [new Recipient(ownerEmail)],
      templateId: MailTemplateId.newJobApplicationForOwner,
      personalization,
      config: {
        subject: `You have a new application for "${jobTitle}" from ${applicantName}`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Team',
      },
    })

    return { success: true }
  } catch (error) {
    console.error(
      'Error sending new application notification to job owner:',
      error,
    )
    return { success: false, error }
  }
}

/**
 * Sends a confirmation email to an applicant when they apply for a job
 * @param applicantEmail Applicant's email address
 * @param applicantName Applicant's name
 * @param jobTitle Job title that was applied for
 * @param companyName Name of the company/job owner
 * @param applicationUrl URL to view the application status
 * @returns Promise that resolves when the email is sent
 */
export const sendApplicationConfirmationToApplicant = async (
  applicantEmail: string,
  applicantName: string,
  jobTitle: string,
  companyName: string,
  applicationUrl: string,
) => {
  try {
    // Calculate response deadline (7 days from now)
    const responseDeadline = new Date()
    responseDeadline.setDate(responseDeadline.getDate() + 7)

    // Use the plain application URL directly
    const personalization: Personalization[] = [
      {
        email: applicantEmail,
        data: {
          applicantName,
          jobTitle,
          companyName,
          applicationUrl,
          // Format the deadline as "Month Day, Year"
          responseDeadline: responseDeadline.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          // Add current date formatted as "Month Day, Year"
          applicationDate: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
        },
      },
    ]

    await mailersendClient.sendMail({
      recipients: [new Recipient(applicantEmail)],
      templateId: MailTemplateId.applicationConfirmationForApplicant,
      personalization,
      config: {
        subject: `Your application for "${jobTitle}" has been submitted`,
        fromEmail: 'team@devhunting.co',
        fromName: 'Good Dev Hunting Team',
      },
    })

    return { success: true }
  } catch (error) {
    console.error('Error sending application confirmation to applicant:', error)
    return { success: false, error }
  }
}

/**
 * Sends a job proposal email to a matched profile
 * @param job The job to send a proposal for
 * @param profile The profile to send the proposal to
 * @param matchReason The reason why the profile was matched with the job
 * @returns Promise that resolves to a success status
 */
export const sendJobProposalEmail = async (
  job: JobModel,
  profile: ProfileModel,
  matchReason: string,
) => {
  try {
    // Create plain URLs for the job and application
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const jobUrl = `${baseUrl}/jobs/${job.id}`
    const applicationUrl = `${baseUrl}/jobs/${job.id}/apply`

    // Format budget string based on budget type
    const budget =
      job.budgetType === 'FIXED'
        ? `${job.minBudgetForProjectRealisation} - ${job.maxBudgetForProjectRealisation} ${job.currency}`
        : `I need a quote`

    // Format job description with truncation if needed
    const jobDescription = job.projectBrief

    // Format job location
    const jobLocation = job.remoteOnly
      ? 'Remote'
      : `${job.city}, ${job.country}`

    await mailersendClient.sendMail({
      recipients: [new Recipient(profile.email, profile.fullName)],
      templateId: MailTemplateId.jobProposal,
      config: {
        subject: `🤑 We have a new job for you!`,
        fromEmail: 'team@devhunting.co',
        fromName: 'GDH Team',
      },
      personalization: [
        {
          email: profile.email,
          data: {
            job_title: job.jobName,
            budget,
            job_description: jobDescription,
            job_tech_stack: job.techStack.map((tech) => tech.name).join(', '),
            job_url: jobUrl,
            job_location: jobLocation,
            job_employment_types: job.employmentTypes.join(', '),
            job_employment_modes: job.employmentModes.join(', '),
            profile_name: profile.fullName,
            match_reason: matchReason,
            application_url: applicationUrl,
            current_year: new Date().getFullYear().toString(),
          },
        },
      ],
    })

    return { success: true }
  } catch (error) {
    console.error(
      `Failed to send job proposal email to ${profile.email}:`,
      error,
    )
    return { success: false, error }
  }
}
