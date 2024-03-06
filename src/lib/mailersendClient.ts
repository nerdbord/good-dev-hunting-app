import { EmailParams, MailerSend, Sender, type Recipient } from 'mailersend'
import { type APIResponse } from 'mailersend/lib/services/request.service'

export enum MailTemplateId {
  welcomeMail = '0r83ql3njn04zw1j',
  contactRequest = '7dnvo4dded345r86',
  profileApprovedNotification = '0r83ql3nq6x4zw1j',
  profileRejectedNotification = 'vywj2lpj1pjl7oqz',
}

interface MailConfig {
  subject: string
  fromEmail: string
  fromName: string
}

interface Substitution {
  var: string
  value: string
}

interface Variable {
  email: string
  substitutions: Substitution[]
}

interface SendMailParams {
  recipients: Recipient[]
  templateId: MailTemplateId
  config: MailConfig
  variables?: Variable[]
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
      .setVariables(params?.variables || [])

    const response: APIResponse = await mailerSend.email.send(emailParams)
    if (response.statusCode < 300) {
      console.log(
        ` Email was sent to recipients. Response status code = ${response.statusCode}`,
      )
    } else {
      console.error(
        `Problem with sending email to recipients. Response status code = ${response.statusCode}`,
      )
    }
  },
}
