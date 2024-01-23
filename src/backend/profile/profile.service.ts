import { CreateProfilePayload } from '@/data/frontend/profile/types'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { Prisma, PublishingState } from '@prisma/client'
import { serializeProfileToProfileModelSimplified } from './profile.serializer'

export async function getPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    include: includeObject,
  })

  const serializedProfile = publishedProfiles.map(
    serializeProfileToProfileModelSimplified,
  )
  return serializedProfile
}

export async function getAllPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      NOT: {
        state: PublishingState.DRAFT,
      },
    },
    include: includeObject,
  })

  const serializedProfile = publishedProfiles.map(
    serializeProfileToProfileModelSimplified,
  )
  return serializedProfile
}

export async function getProfileById(id: string) {
  const profileById = await prisma.profile.findFirst({
    where: {
      id,
    },
    include: includeObject,
  })

  if (profileById !== null) {
    return serializeProfileToProfileModelSimplified(profileById)
  }

  // Handle the case when profileById is null
  return null
}

export async function doesUserProfileExist(email: string) {
  const foundProfile = await prisma.profile.findFirst({
    where: {
      user: {
        email,
      },
    },
    include: {
      user: true,
      country: true,
      city: true,
      techStack: true,
    },
  })

  return foundProfile
}

export async function createUserProfile(
  email: string,
  profileData: CreateProfilePayload,
) {
  const createdUser = await prisma.profile.create({
    data: {
      user: {
        connect: { email },
      },
      fullName: profileData.fullName,
      linkedIn: profileData.linkedIn,
      bio: profileData.bio,
      country: {
        connectOrCreate: {
          create: {
            name: profileData.country.name,
          },
          where: {
            name: profileData.country.name,
          },
        },
      },
      openForCountryRelocation: profileData.openForCountryRelocation,
      city: {
        connectOrCreate: {
          create: {
            name: profileData.city.name,
          },
          where: {
            name: profileData.city.name,
          },
        },
      },
      openForCityRelocation: profileData.openForCityRelocation,
      remoteOnly: profileData.remoteOnly,
      position: profileData.position,
      seniority: profileData.seniority,
      techStack: {
        connectOrCreate: profileData.techStack.map((tech) => {
          return {
            create: {
              techName: tech.techName,
            },
            where: {
              techName: tech.techName,
            },
          }
        }),
      },
      employmentType: profileData.employmentType,
      state: PublishingState.DRAFT,
    },
    include: includeObject,
  })
  return createdUser
}

export async function updateUserData(
  id: string,
  userDataToUpdate: Prisma.ProfileUpdateInput,
) {
  const updatedUser = await prisma.profile.update({
    where: {
      id,
    },
    data: userDataToUpdate,
  })
  if (userDataToUpdate?.state) {
    sendDiscordNotificationToModeratorChannel(
      `User's ${updatedUser.fullName} profile has got new status: ${userDataToUpdate.state}! Profile: ${process.env.NEXT_PUBLIC_APP_ORIGIN_URL}/dashboard/profile/${updatedUser.userId}`,
    )
  }
  return updatedUser
}

export async function getProfileByUserId(userId: string) {
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: includeObject,
  })

  if (profile) {
    return serializeProfileToProfileModelSimplified(profile)
  }

  return null
}

export async function getProfileByUserEmail(email: string) {
  const profile = await prisma.profile.findFirst({
    where: { user: { email } },
    include: includeObject,
  })

  if (profile) {
    return serializeProfileToProfileModelSimplified(profile)
  }

  return null
}

// Hence almost all of those queries had such includeObject, i've decided to simply reuse it.
const includeObject = {
  user: {
    include: {
      githubDetails: true,
    },
  },
  country: true,
  city: true,
  techStack: {
    include: {
      technology: true,
    },
  },
}
