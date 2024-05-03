'use server'
import { getAuthorizedUser } from '@/app/(auth)/auth.helpers'
import {
  createProfileModel,
  type ProfileModel,
} from '@/app/[locale]/(profile)/_models/profile.model'
import {
  findProfileWithUserInclude,
  hasProfileValuesChanged,
  updateProfileById,
} from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { Currency, PublishingState, type Prisma } from '@prisma/client'

export const saveMyProfile = withSentry(async (payload: ProfileModel) => {
  const { user } = await getAuthorizedUser()
  if (!user) throw new Error('User not found')

  const foundProfile = await findProfileWithUserInclude(user.email)

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
          name: payload.country,
        },
        where: { name: payload.country },
      },
    },
    openForCountryRelocation: payload.openForCountryRelocation,
    city: {
      connectOrCreate: {
        create: {
          name: payload.city,
        },
        where: { name: payload.city },
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
    hourlyRateMin: payload.hourlyRateMin,
    hourlyRateMax: payload.hourlyRateMax,
    currency: Currency.PLN,
  }

  const updatedProfile = await updateProfileById(foundProfile.id, updatedData)
  const isPreviouslyPending = foundProfile.state === PublishingState.PENDING

  if (!isPreviouslyPending) {
    await sendDiscordNotificationToModeratorChannel(
      `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
    )
  }

  return createProfileModel(updatedProfile)
})
