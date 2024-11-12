import { createUserModel } from '@/app/[locale]/(auth)/_models/User.model'
import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { withSentry } from '@/utils/errHandling'

export const registerNewUser = withSentry(
  async ({
    id: _id,
    provider,
    githubUsername,
    linkedinUsername,
    name,
    ...data
  }) => {
    const userData = { ...data }

    if (githubUsername) {
      userData.githubDetails = {
        create: {
          username: githubUsername,
        },
      }
    }

    if (linkedinUsername) {
      userData.linkedinDetails = {
        create: {
          username: linkedinUsername,
        },
      }
    }

    const createdUser = await prisma.user.create({
      data: userData,
      include: {
        githubDetails: true,
        linkedinDetails: true,
      },
    })
    if (!createdUser) {
      throw new Error('Failed to create user')
    }
    const devName =
      name ?? githubUsername ?? linkedinUsername ?? createdUser.email

    const isSpecialist = provider === 'github' || provider === 'linkedin'

    await sendWelcomeEmail(createdUser.email, devName)
    await sendDiscordNotificationToModeratorChannel(
      `User **${devName}** has created an account with **${provider.toUpperCase()}** as ${
        isSpecialist
          ? `**SPECIALIST** ${!name ? `with **${createdUser.email}**` : ''}`
          : '**HUNTER**'
      }`,
    )

    return createUserModel(createdUser)
  },
)
