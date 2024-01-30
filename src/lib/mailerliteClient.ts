import MailerLite from '@mailerlite/mailerlite-nodejs'

export const mailerLiteClient = new MailerLite({
  api_key: process.env.NEXT_PUBLIC_MAILERLITE_KEY || '',
})

export const devGroup = '111547703431792014'

export const contactGroup = '111547722557818681'
