import { EmailParams, MailerSend, Recipient, Sender } from 'mailersend'
import { APIResponse } from 'mailersend/lib/services/request.service'

export enum MailTemplateId {
  welcomeMail = 'x2p03478r1ylzdrn',
  contactRequest = 'vywj2lpj1pjl7oqz',
}

export enum MailSubjectId {
  welcomeSubject = 'Welcome to Good Dev!',
}

export const mailersendClient = {
  async sendMail(
    recipients: Recipient[],
    templateId: MailTemplateId,
    subject: MailSubjectId | string,
    sender?: Sender,
  ) {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    })

    const sentFrom =
      sender ||
      new Sender(
        process.env.MAILERSEND_FROM!,
        process.env.MAILERSEND_FROM_NAME!,
      )

    interface Substitution {
      var: string
      value: string
    }

    interface Variable {
      email: string
      substitutions: Substitution[]
    }

    const variables: Variable[] = recipients.map((recipient) => ({
      email: recipient.email,
      substitutions: [
        {
          var: 'name',
          value: recipient.name || '',
        },
        {
          var: 'account.name',
          value: process.env.MAILERSEND_FROM_NAME!,
        },
        {
          var: 'support_email',
          value: process.env.MAILERSEND_FROM!,
        },
      ],
    }))

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject(subject)
      .setTemplateId(templateId)
      .setVariables(variables)

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
