import { EmailParams, MailerSend, Sender, type Recipient } from 'mailersend'
import { type Personalization } from 'mailersend/lib/modules/Email.module'
import { type APIResponse } from 'mailersend/lib/services/request.service'

export enum MailTemplateId {
  // EN (Profiles flow)
  welcomeMail = '0r83ql3njn04zw1j',
  contactRequest = '7dnvo4dded345r86',
  profileApprovedNotification = '0r83ql3nq6x4zw1j',
  profileRejectedNotification = 'vywj2lpj1pjl7oqz',
  verificationRequest = 'vywj2lpj96kl7oqz',

  // EN (Jobs flow)
  jobProposal = '3vz9dle2ow1lkj50',
  jobPublished = '3zxk54v1e0z4jy6v',
  applicantUnreadMessagesNotification = '0p7kx4x9w1m49yjr',
  jobOwnerUnreadMessagesNotification = 'neqvygm10zjg0p7w',
  newJobApplicationForOwner = 'z3m5jgrmo7d4dpyo',
  applicationConfirmationForApplicant = '351ndgwkv7ngzqx8',

  // PL (Jobs flow)
  jobProposal_pl = 'z3m5jgrmr3x4dpyo',
  jobPublished_pl = 'neqvygm1xqdg0p7w',
  applicantUnreadMessagesNotification_pl = '3zxk54vvk9x4jy6v',
  jobOwnerUnreadMessagesNotification_pl = 'o65qngk8zewgwr12',
  newJobApplicationForOwner_pl = '3vz9dle56nnlkj50',
  applicationConfirmationForApplicant_pl = '3yxj6lj27xxgdo2r',
}

interface MailConfig {
  subject: string
  fromEmail: string
  fromName: string
}

interface SendMailParams {
  recipients: Recipient[]
  templateId: MailTemplateId
  config: MailConfig
  personalization?: Personalization[]
}

export const mailersendClient = {
  async sendMail(params: SendMailParams) {
    if (!process.env.MAILERSEND_API_KEY) {
      console.log('No MAILERSEND_API_KEY found in env vars. Skipping email.')
      return
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY,
    })

    const sentFrom = new Sender(params.config.fromEmail, params.config.fromName)

    const emailParams = new EmailParams()
      .setFrom(new Sender('info@devhunting.co', 'Good DevHunting'))
      .setTo(params.recipients)
      .setReplyTo(sentFrom)
      .setSubject(params.config.subject)
      .setTemplateId(params.templateId)
      .setPersonalization(params?.personalization || [])

    const response: APIResponse = await mailerSend.email.send(emailParams)
    if (response.statusCode < 300) {
      console.log(
        `Email was sent to recipients. Response status code = ${response.statusCode}`,
      )
    } else {
      console.error(
        `Problem with sending email to recipients. Response status code = ${response.statusCode}`,
      )
    }
  },
}
