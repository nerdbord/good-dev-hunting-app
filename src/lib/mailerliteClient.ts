import MailerLite from '@mailerlite/mailerlite-nodejs'

const mailerliteInstance = new MailerLite({
  api_key: process.env.MAILERLITE_KEY || '',
})

export enum mailerliteGroups {
  devGroup = '111547703431792014',
  contactGroup = '111547722557818681',
}

export const mailerliteClient = {
  addSubscriberToMailerLite: async (
    email: string,
    groupId: string,
    fields?: Record<string, string>,
  ) => {
    try {
      return await mailerliteInstance.subscribers.createOrUpdate({
        email,
        groups: [groupId],
        fields,
      })
    } catch (error) {
      console.error('Error adding subscriber to MailerLite:', error)
      return error
    }
  },
}
