import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { withSentry } from '@/utils/errHandling'

export const registerNewUser = withSentry(async ({ id: _id, ...data }) => {
  const createdUser = await prisma.user.create({ data })

  if (!createdUser) {
    throw new Error('Failed to create user')
  }

  const devName = createdUser.name
    ? createdUser.name
    : createdUser.email || 'Developer'

  await sendWelcomeEmail(createdUser.email, devName)
  await sendDiscordNotificationToModeratorChannel(
    `User ${devName} has created an account`,
  )

  return createdUser
})
