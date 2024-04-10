import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { withSentry } from '@/utils/errHandling'

export const registerNewUser = withSentry(
  async ({ id: _id, githubUsername, name, ...data }) => {
    const userData = { ...data }

    if (githubUsername) {
      userData.githubDetails = {
        create: {
          username: githubUsername,
        },
      }
    }

    const createdUser = await prisma.user.create({
      data: userData,
    })
    if (!createdUser) {
      throw new Error('Failed to create user')
    }
    const devName = name ? name : createdUser.email || 'Developer'

    await sendWelcomeEmail(createdUser.email, devName)
    await sendDiscordNotificationToModeratorChannel(
      `User ${devName} has created an account`,
    )

    return createdUser
  },
)
