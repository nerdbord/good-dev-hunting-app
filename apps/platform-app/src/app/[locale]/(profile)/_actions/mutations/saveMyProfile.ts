'use server'
import { getAuthorizedUser } from '@/app/[locale]/(auth)/auth.helpers'
import { findProfileByUserId } from '@/app/[locale]/(profile)/_actions/queries'
import {
  createProfileModel,
  type ProfileModel,
} from '@/app/[locale]/(profile)/_models/profile.model'
import { runEvaluateProfileAgent } from '@/app/[locale]/(profile)/_workflows/profile-evaluation.workflow'
import {
  hasCommonFields,
  hasProfileValuesChanged,
} from '@/app/[locale]/(profile)/profile.helpers'
import { type EditProfileFormFields } from '@/app/[locale]/(profile)/profile.types'
import { updateProfileById } from '@/backend/profile/profile.service'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { withSentry } from '@/utils/errHandling'
import { Currency, PublishingState, type Prisma } from '@prisma/client'

const profilePendingFields: EditProfileFormFields[] = [
  // fields that should change profile publishing state to PENDING
  // PERSONAL INFORMATION
  'fullName',
  'email',
  'avatarUrl',
  'linkedIn',
  'bio',

  // LOCATION PREFERENCES
  'country',
  'openForCountryRelocation',
  'city',
  'openForCityRelocation',
  'remoteOnly',

  // WORK INFORMATION
  // 'position',
  // 'seniority',
  // 'hourlyRateMin',
  // 'hourlyRateMax',
  // 'techStack',
  // 'employmentTypes',
]

export const saveMyProfile= withSentry(async (payload: ProfileModel, saveWithPublish: boolean) => {
  const { user } = await getAuthorizedUser()
  if (!user) {
    throw new Error('User not found')
  }

  const foundProfile = await findProfileByUserId(user.id)
  if (!foundProfile) {
    throw new Error('Profile not found')
  }

  const changedFields = hasProfileValuesChanged(foundProfile, payload)
  if (!changedFields) {
    return foundProfile
  }

  const updatedState = hasCommonFields(changedFields, profilePendingFields)
    ? PublishingState.DRAFT
    : payload.state

  const updatedTechStack = payload.techStack.map((tech) => tech.name)

  const updatedLanguage = payload.language.map((lang) => lang.name)

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
    state: updatedState,
    hourlyRateMin: payload.hourlyRateMin,
    hourlyRateMax: payload.hourlyRateMax,
    currency: payload.currency,
    language: {
      disconnect: foundProfile.language
        .filter((lang) => !updatedLanguage.includes(lang.name))
        .map((lang) => ({
          name: lang.name,
        })),
      connectOrCreate: payload.language.map((lang) => ({
        where: { name: lang.name },
        create: {
          name: lang.name,
        },
      })),
    },
  }

  const updatedProfile = await updateProfileById(foundProfile.id, updatedData)

  if (saveWithPublish && updatedProfile.state === PublishingState.PENDING) {
    await runEvaluateProfileAgent(foundProfile.id)

    await sendDiscordNotificationToModeratorChannel(
      `User's **${updatedProfile.fullName}** profile has got new status: **${updatedProfile.state}**! [Show Profile](${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/moderation/profile/${updatedProfile.userId})`,
    )
  }

  return createProfileModel(updatedProfile)
})
