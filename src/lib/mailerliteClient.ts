import MailerLite from '@mailerlite/mailerlite-nodejs'

export const mailerLiteClient = new MailerLite({
  api_key: process.env.MAILER_LITE_KEY || '',
})
