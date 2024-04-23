import { createUserModel } from '@/app/(auth)/_models/User.model'
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
      include: {
        githubDetails: true,
      },
    })
    if (!createdUser) {
      throw new Error('Failed to create user')
    }
    const devName = name ?? githubUsername ?? createdUser.email

    await sendWelcomeEmail(createdUser.email, devName)
    await sendDiscordNotificationToModeratorChannel(
      `User ${devName} has created an account as ${
        githubUsername ? 'SPECIALIST' : 'HUNTER'
      }`,
    )

    return createUserModel(createdUser)
  },
)
