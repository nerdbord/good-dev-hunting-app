import MailerLite from '@mailerlite/mailerlite-nodejs'
import { httpClient } from './httpClient'

const mailerliteInstance = new MailerLite({
  api_key: process.env.NEXT_PUBLIC_MAILERLITE_KEY || '',
})

export const mailerliteClient = {
  devGroup: '111547703431792014',
  contactGroup: '111547722557818681',
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
  fetchSubscribersFromMailerLite: async (groupId: string) => {
    try {
      return await httpClient.get(
        `https://connect.mailerlite.com/api/groups/${groupId}/subscribers`,
      )
    } catch (error) {
      console.error('Error fetching subscribers', error)
      return error
    }
  },
}
