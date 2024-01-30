import { httpClient } from '@/lib/httpClient'
import { mailerLiteClient } from '@/lib/mailerliteClient'

export async function addSubscriberToMailerLite(
  email: string,
  groupId: string,
  fields?: Record<string, string>,
) {
  try {
    return await mailerLiteClient.subscribers.createOrUpdate({
      email,
      groups: [groupId],
      fields,
    })
  } catch (error) {
    console.error('Error adding subscriber to MailerLite:', error)
    return error
  }
}

export async function fetchSubscribersFromMailerLite(groupId: string) {
  try {
    return await httpClient.get(
      `https://connect.mailerlite.com/api/groups/${groupId}/subscribers`,
    )
  } catch (error) {
    console.error('Error fetching subscribers', error)
    return error
  }
}
