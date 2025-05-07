import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import type { User } from '@prisma/client'
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
  locale: User['language']
}

export const sendContactRequest = async ({
  senderEmail,
  senderFullName,
  subject,
  message,
  recipientEmail,
  recipientFullName,
  locale,
}: ContactRequestEmailParams) => {
  try {
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
    const config = {
      fromEmail: senderEmail,
      fromName: senderFullName,
      subject: subject,
    }

    let templateId: MailTemplateId
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.contactRequest //TODO: PL
        break
      default:
        templateId = MailTemplateId.contactRequest
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(recipientEmail)],
      templateId,
      config,
      personalization,
    })
  } catch (error) {
    console.error('Error occured whilst sending contact request.', error)
  }
}

export const sendProfileApprovedEmail = async ({
  email,
  githubUsername,
  locale,
}: {
  email: string
  githubUsername: string
  locale: User['language']
}) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        username: githubUsername,
      },
    },
  ]

  let templateId: MailTemplateId
  let subject: string
  switch (locale) {
    case 'pl':
      templateId = MailTemplateId.profileApprovedNotification //TODO: PL
      subject = '✅ Twój profil został zaakceptowany'
      break
    default:
      templateId = MailTemplateId.profileApprovedNotification
      subject = '✅ Your profile has been approved'
  }

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendProfileRejectedEmail = async ({
  email,
  reason,
  locale,
}: {
  email: string
  reason: string
  locale: User['language']
}) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        reason: reason,
      },
    },
  ]

  let templateId: MailTemplateId
  let subject: string
  switch (locale) {
    case 'pl':
      templateId = MailTemplateId.profileRejectedNotification //TODO: PL
      subject = '⚠️Twój profil został odrzucony'
      break
    default:
      templateId = MailTemplateId.profileRejectedNotification
      subject = '⚠️Your profile has been rejected'
  }

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

export const sendWelcomeEmail = async ({
  email,
  username,
  locale,
}: {
  email: string
  username: string
  locale: User['language']
}) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        name: username,
      },
    },
  ]

  let templateId: MailTemplateId
  let subject: string
  switch (locale) {
    case 'pl':
      templateId = MailTemplateId.welcomeMail //TODO: PL
      subject = `Witaj na łowisku talentów, ${username}!`
      break
    default:
      templateId = MailTemplateId.welcomeMail
      subject = `Welcome to the Hunt, ${username}!`
  }

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject,
      fromEmail: 'team@devhunting.co',
      fromName: 'Good Dev Hunting Team',
    },
  })
}

//TODO:
export const sendMagicLinkEmail = async ({
  email,
  url,
  locale,
}: {
  email: string
  url: string
  locale: User['language']
}) => {
  const personalization: Personalization[] = [
    {
      email,
      data: {
        authUrl: url,
      },
    },
  ]

  let templateId: MailTemplateId
  let subject: string
  switch (locale) {
    case 'pl':
      templateId = MailTemplateId.verificationRequest //TODO: PL
      subject = `Witaj na łowisku talentów, ${email}!`
      break
    default:
      templateId = MailTemplateId.verificationRequest
      subject = `Welcome to the Hunt, ${email}!`
  }

  await mailersendClient.sendMail({
    recipients: [new Recipient(email)],
    templateId,
    personalization,
    config: {
      subject,
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
 * @param locale language of the email "pl" | "en"
 * @returns Promise that resolves when the email is sent
 */
export const sendApplicantUnreadMessagesNotification = async ({
  email,
  username,
  unreadCount,
  locale,
}: {
  email: string
  unreadCount: number
  username: string
  locale: User['language']
}) => {
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

    let templateId: MailTemplateId
    let subject: string
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.applicantUnreadMessagesNotification //TODO: PL
        subject = `Masz ${unreadCount} nieprzeczytan${
          unreadCount === 1
            ? 'ą wiadomość'
            : unreadCount < 5
            ? 'e wiadomości'
            : 'ych wiadomości'
        } od pracodawców`
        break
      default:
        templateId = MailTemplateId.applicantUnreadMessagesNotification
        subject = `You have ${unreadCount} unread message${
          unreadCount > 1 ? 's' : ''
        } from employers`
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(email)],
      templateId,
      personalization,
      config: {
        subject,
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
 * @param locale language of the email "pl" | "en"
 * @returns Promise that resolves when the email is sent
 */
export const sendJobOwnerUnreadMessagesNotification = async ({
  email,
  username,
  unreadCount,
  locale,
}: {
  email: string
  unreadCount: number
  username: string
  locale: User['language']
}) => {
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

    let templateId: MailTemplateId
    let subject: string
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.jobOwnerUnreadMessagesNotification //TODO: PL
        subject = `Masz ${unreadCount} nieprzeczytan${
          unreadCount === 1
            ? 'ą wiadomość'
            : unreadCount < 5
            ? 'e wiadomości'
            : 'ych wiadomości'
        } od kandydatów`
        break
      default:
        templateId = MailTemplateId.jobOwnerUnreadMessagesNotification
        subject = `You have ${unreadCount} unread message${
          unreadCount > 1 ? 's' : ''
        } from job applicants`
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(email)],
      templateId,
      personalization,
      config: {
        subject,
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
export async function sendJobPublishedEmail({
  job,
  user,
  matchedProfilesCount,
  locale,
}: {
  job: JobModel
  user: AuthUser
  matchedProfilesCount: number
  locale: User['language']
}): Promise<boolean> {
  try {
    // Create plain URLs for the job and applications
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const jobUrl = `${baseUrl}/jobs/${job.id}`
    const applicationsUrl = `${baseUrl}/jobs/${job.id}/applications`

    let templateId: MailTemplateId
    let subject: string
    let matchStatusMessage: string
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.jobPublished //TODO: PL
        subject = `Twoje zlecenie "${job.jobName}" zostało opublikowane!`
        if (matchedProfilesCount === 0) {
          matchStatusMessage =
            'Obecnie nie mamy specjalistów spełniających wymagania Twojej oferty. Proces może potrwać nieco dłużej, ale powiadomimy Cię, gdy tylko znajdziemy odpowiednich kandydatów.'
        } else if (matchedProfilesCount === 1) {
          matchStatusMessage =
            'Przesłaliśmy Twoją ofertę 1 specjaliście, który spełnia Twoje wymagania. Wkrótce powinieneś otrzymać pierwsze aplikacje.'
        } else {
          matchStatusMessage = `Przesłaliśmy Twoją ofertę ${matchedProfilesCount} specjalistom spełniającym Twoje wymagania. Wkrótce powinieneś otrzymać aplikacje.`
        }
        break
      default:
        templateId = MailTemplateId.jobPublished
        subject = `Your job "${job.jobName}" has been published!`
        if (matchedProfilesCount === 0) {
          matchStatusMessage =
            "Currently, we don't have specialists that match your job requirements. It may take longer to receive applications, but we'll notify you as soon as we find suitable candidates."
        } else if (matchedProfilesCount === 1) {
          matchStatusMessage = `We've sent your job to 1 specialist who matches your requirements. You should start receiving applications soon.`
        } else {
          matchStatusMessage = `We've sent your job to ${matchedProfilesCount} specialists who match your requirements. You should start receiving applications soon.`
        }
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(user.email, user.name || 'Job Poster')],
      templateId,
      config: {
        subject,
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
 * @param locale language of the email "pl" | "en"
 * @returns Promise that resolves when the email is sent
 */
export const sendNewApplicationNotificationToOwner = async ({
  ownerEmail,
  ownerName,
  applicantName,
  jobTitle,
  applicationUrl,
  locale,
}: {
  ownerEmail: string
  ownerName: string
  applicantName: string
  jobTitle: string
  applicationUrl: string
  locale: User['language']
}) => {
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

    let templateId: MailTemplateId
    let subject: string
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.newJobApplicationForOwner //TODO: PL
        subject = `Masz nową aplikację na ofertę "${jobTitle}" od ${applicantName}`
        break
      default:
        templateId = MailTemplateId.newJobApplicationForOwner
        subject = `You have a new application for "${jobTitle}" from ${applicantName}`
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(ownerEmail)],
      templateId,
      personalization,
      config: {
        subject,
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
 * @param locale language of the email "pl" | "en"
 * @returns Promise that resolves when the email is sent
 */
export const sendApplicationConfirmationToApplicant = async ({
  applicantEmail,
  applicantName,
  applicationUrl,
  jobTitle,
  companyName,
  locale,
}: {
  applicantEmail: string
  applicantName: string
  jobTitle: string
  companyName: string
  applicationUrl: string
  locale: User['language']
}) => {
  try {
    // Calculate response deadline (7 days from now)
    const responseDeadline = new Date()
    responseDeadline.setDate(responseDeadline.getDate() + 7)

    let templateId: MailTemplateId
    let subject: string
    let applicationDate
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.applicationConfirmationForApplicant //TODO: PL
        subject = `Twoja aplikacja na stanowisko "${jobTitle}" została wysłana`
        responseDeadline.toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        applicationDate = new Date().toLocaleDateString('pl-PL', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        break
      default:
        templateId = MailTemplateId.applicationConfirmationForApplicant
        subject = `Your application for "${jobTitle}" has been submitted`

        responseDeadline.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
        applicationDate = new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
    }

    // Use the plain application URL directly
    const personalization: Personalization[] = [
      {
        email: applicantEmail,
        data: {
          applicantName,
          jobTitle,
          companyName,
          applicationUrl,
          responseDeadline,
          applicationDate,
        },
      },
    ]

    await mailersendClient.sendMail({
      recipients: [new Recipient(applicantEmail)],
      templateId,
      personalization,
      config: {
        subject,
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
 * @param locale language of the email "pl" | "en"
 * @returns Promise that resolves to a success status
 */
export const sendJobProposalEmail = async ({
  job,
  profile,
  matchReason,
  locale,
}: {
  job: JobModel
  profile: ProfileModel
  matchReason: string
  locale: User['language']
}) => {
  try {
    // Create plain URLs for the job and application
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const jobUrl = `${baseUrl}/jobs/${job.id}`
    const applicationUrl = `${baseUrl}/jobs/${job.id}/apply`

    // Format job description with truncation if needed
    const jobDescription = job.projectBrief

    let templateId: MailTemplateId
    let subject: string
    let budget: string
    let jobLocation: string
    switch (locale) {
      case 'pl':
        templateId = MailTemplateId.jobProposal //TODO: PL
        subject = `🤑 Mamy nowe zlecenie dla Ciebie!`
        jobLocation = job.remoteOnly ? 'Zdalnie' : `${job.city}, ${job.country}`
        budget =
          job.budgetType === 'FIXED'
            ? `${job.minBudgetForProjectRealisation} - ${job.maxBudgetForProjectRealisation} ${job.currency}`
            : `Potrzebuję wyceny`
        break
      default:
        templateId = MailTemplateId.jobProposal
        subject = `🤑 We have a new job for you!`
        jobLocation = job.remoteOnly ? 'Remote' : `${job.city}, ${job.country}`
        budget =
          job.budgetType === 'FIXED'
            ? `${job.minBudgetForProjectRealisation} - ${job.maxBudgetForProjectRealisation} ${job.currency}`
            : `I need a quote`
    }

    await mailersendClient.sendMail({
      recipients: [new Recipient(profile.email, profile.fullName)],
      templateId,
      config: {
        subject,
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
