'use server'
import { authorizeUser } from '@/app/(auth)/helpers'
import { type ProfilePayload } from '@/app/(profile)/types'
import {
  findProfileWithUserInclude,
  hasProfileValuesChanged,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { PublishingState, type Prisma } from '@prisma/client'

export const saveMyProfile = withSentry(async (payload: ProfilePayload) => {
  await authorizeUser()

  const { email } = await authorizeUser()
  const foundProfile = await findProfileWithUserInclude(email)

  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const shouldUpdateProfile = await hasProfileValuesChanged(
    foundProfile.id,
    payload,
  )

  if (!shouldUpdateProfile) {
    return foundProfile
  }

  const updatedTechStack = payload.techStack.map((tech) => tech.name)

  const updatedData: Prisma.ProfileUpdateInput = {
    fullName: payload.fullName,
    linkedIn: payload.linkedIn,
    bio: payload.bio,
    country: {
      connectOrCreate: {
        create: {
          name: payload.country.name,
        },
        where: { name: payload.country.name },
      },
    },
    openForCountryRelocation: payload.openForCountryRelocation,
    city: {
      connectOrCreate: {
        create: {
          name: payload.city.name,
        },
        where: { name: payload.city.name },
      },
    },
    techStack: {
      disconnect: foundProfile.techStack
        .filter((tech) => !updatedTechStack.includes(tech.name))
        .map((tech) => ({
          name: tech.name,
        })),
      connectOrCreate: payload.techStack.map((tech) => ({
        where: { name: tech.name },
        create: {
          name: tech.name,
        },
      })),
    },
    openForCityRelocation: payload.openForCityRelocation,
    remoteOnly: payload.remoteOnly,
    position: payload.position,
    seniority: payload.seniority,
    employmentTypes: payload.employmentTypes,
    state: PublishingState.PENDING,
  }

  const updatedProfile = await updateProfileById(foundProfile.id, updatedData)
  const isPreviouslyPending = foundProfile.state === PublishingState.PENDING

  if (!isPreviouslyPending) {
    await sendDiscordNotificationToModeratorChannel(
      `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
    )
  }

  return updatedProfile
})
