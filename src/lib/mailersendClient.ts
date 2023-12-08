import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend'
import { APIResponse } from 'mailersend/lib/services/request.service'

export const mailersendClient = {
  async sendMail(email: string, name?: string) {
    const mailerSend = new MailerSend({
      apiKey: process.env.MAILERSEND_API_KEY!,
    })

    const sentFrom = new Sender(
      process.env.MAILERSEND_FROM!,
      process.env.MAILERSEND_FROM_NAME!,
    )

    const recipients = [new Recipient(email, name)]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject('Welcome to Good Dev Hunting')
      .setTemplateId(process.env.MAILERSEND_TEMPLATE_ID!)

    const response: APIResponse = await mailerSend.email.send(emailParams)
    if (response.statusCode !== 200) {
      console.error(
        `Problem with sending email to ${email}. Response status code = ${response.statusCode}`,
      )
    }
  },
}
