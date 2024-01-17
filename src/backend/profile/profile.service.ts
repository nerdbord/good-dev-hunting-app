import { CreateProfilePayload } from '@/data/frontend/profile/types'
import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { prisma } from '@/lib/prismaClient'
import { Prisma, PublishingState } from '@prisma/client'
import { serializeProfileToProfileModel } from './profile.serializer'

export async function getPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
  })

  const serializedProfile = publishedProfiles.map(
    serializeProfileToProfileModel,
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
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
  })

  const serializedProfile = publishedProfiles.map(
    serializeProfileToProfileModel,
  )
  return serializedProfile
}

export async function getProfileById(id: string) {
  const profileById = await prisma.profile.findFirst({
    where: {
      id,
    },
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
  })

  if (profileById !== null) {
    return serializeProfileToProfileModel(profileById)
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
      techStack: profileData.techStack,
      employmentType: profileData.employmentType,
      state: PublishingState.DRAFT,
    },
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
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
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
  })

  if (profile) {
    return serializeProfileToProfileModel(profile)
  }

  return null
}

export async function getProfileByUserEmail(email: string) {
  const profile = await prisma.profile.findFirst({
    where: { user: { email } },
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
      country: true,
      city: true,
    },
  })

  if (profile) {
    return serializeProfileToProfileModel(profile)
  }

  return null
}
