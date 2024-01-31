import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import { APIResponse } from 'mailersend/lib/services/request.service'

export enum MailTemplateId {
  welcomeMail = 'x2p03478r1ylzdrn',
  contactRequest = 'vywj2lpj1pjl7oqz',
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
    if (!process.env.NEXT_PUBLIC_MAILERSEND_API_KEY) {
      console.log('No MAILERSEND_API_KEY found in env vars. Skipping email.')
      return
    }

    const mailerSend = new MailerSend({
      apiKey: process.env.NEXT_PUBLIC_MAILERSEND_API_KEY,
    })

    const sentFrom = new Sender(params.config.fromEmail, params.config.fromName)

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
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
