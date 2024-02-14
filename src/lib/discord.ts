import { httpClient } from '@/lib/httpClient'

export async function sendDiscordNotificationToWebhook(params: {
  message: string
  webhookUrl: string
}) {
  try {
    // sending the message through webhook url
    await httpClient.post(params.webhookUrl, {
      content: params.message,
    })
  } catch (error) {
    console.error('Discord notification error', error)
  }
}

export async function sendDiscordNotificationToModeratorChannel(
  message: string,
) {
  if (!process.env.NEXT_PUBLIC_MODERATION_WEBHOOK) {
    console.error('Moderation webhook not found')
    return
  }

  await sendDiscordNotificationToWebhook({
    message,
    webhookUrl: process.env.NEXT_PUBLIC_MODERATION_WEBHOOK,
  })
}
