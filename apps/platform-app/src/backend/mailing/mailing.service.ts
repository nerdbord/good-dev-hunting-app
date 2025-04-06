import { mailersendClient, MailTemplateId } from '@/lib/mailersendClient'
import { Recipient } from 'mailersend'
import { type Personalization } from 'mailersend/lib/modules/Email.module'

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
    const personalization: Personalization[] = [
      {
        email,
        data: {
          username,
          unreadCount,
          loginUrl: process.env.NEXT_PUBLIC_APP_URL + '/my-profile/inbox',
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
    const personalization: Personalization[] = [
      {
        email,
        data: {
          username,
          unreadCount,
          loginUrl: process.env.NEXT_PUBLIC_APP_URL + '/jobs/my',
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
        subject: `New application for "${jobTitle}" from ${applicantName}`,
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
