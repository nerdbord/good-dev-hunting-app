'use server'
import { sendWelcomeEmail } from '@/backend/mailing/mailing.service'
import { createUser } from '@/backend/user/user.service'
import { CreateUserPayload } from '@/backend/user/user.types'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { withSentry } from '@/utils/errHandling'

export const registerNewUser = withSentry(
  async ({ email, name, image, githubUsername }: CreateUserPayload) => {
    const createdUser = await createUser({
      email,
      name,
      image,
      githubUsername,
    })

    if (!createdUser) {
      throw new Error('Failed to create user')
    }

    const devName = createdUser.githubDetails?.username || 'Developer'

    await sendWelcomeEmail(createdUser.email, devName)
    await sendDiscordNotificationToModeratorChannel(
      `User ${devName} has created an account`,
    )
    await mailerliteClient.addSubscriberToMailerLite(
      createdUser.email,
      mailerliteGroups.devGroup,
    )

    return createdUser
  },
)
