import { CreateProfilePayload, ProfileModel } from '@/app/(profile)/types'
import { prisma } from '@/lib/prismaClient'
import { Prisma, PublishingState, Role } from '@prisma/client'
import { serializeProfileToProfileModel } from './profile.serializer'

export async function getPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    include: includeObject.include,
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
    include: includeObject.include,
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
    include: includeObject.include,
  })

  if (profileById !== null) {
    return serializeProfileToProfileModel(profileById)
  }

  // Handle the case when profileById is null
  return null
}

export async function findProfileWithUserInclude(email: string) {
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
      techStack: {
        connectOrCreate: profileData.techStack.map((tech) => ({
          where: { name: tech.techName },
          create: {
            name: tech.techName,
          },
        })),
      },
      openForCityRelocation: profileData.openForCityRelocation,
      remoteOnly: profileData.remoteOnly,
      position: profileData.position,
      seniority: profileData.seniority,
      employmentTypes: profileData.employmentTypes,
      state: PublishingState.DRAFT,
    },
    include: includeObject.include,
  })
  return createdUser
}

export async function updateProfileById(
  id: string,
  data: Prisma.ProfileUpdateInput,
) {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data,
    include: {
      user: true,
    },
  })

  return updatedProfile
}

export async function findProfileById(id: string) {
  const profile = await prisma.profile.findFirst({
    where: { id },
    include: includeObject.include,
  })

  if (profile) {
    return serializeProfileToProfileModel(profile)
  }

  return null
}

export async function getProfileByUserId(userId: string) {
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: includeObject.include,
  })

  if (profile) {
    return serializeProfileToProfileModel(profile)
  }

  return null
}

export async function getProfileByUserEmail(email: string) {
  const profile = await prisma.profile.findFirst({
    where: { user: { email } },
    include: includeObject.include,
  })

  if (profile) {
    return serializeProfileToProfileModel(profile)
  }

  return null
}

export const hasProfileValuesChanged = async (
  profileId: string,
  payload: ProfileModel,
) => {
  const existingProfile = await findProfileById(profileId)

  if (!existingProfile) {
    return false
  }

  // Compare each field in the payload with the existing profile data
  const hasChanged = Object.keys(payload).some((key) => {
    // @ts-ignore
    return existingProfile[key] !== payload[key]
  })

  return hasChanged
}

export async function getPublishedProfiles(take: number) {
  const publishedProfiles = await prisma.profile.findMany({
    take,
    where: {
      state: PublishingState.APPROVED,
    },
    include: includeObject.include,
  })
  const serializedProfile = publishedProfiles.map(
    serializeProfileToProfileModel,
  )
  return serializedProfile
}

export async function getRandomProfiles(profilesCount: number) {
  const totalProfiles = await prisma.profile.count()

  if (profilesCount > totalProfiles) {
    return getPublishedProfiles(6)
  }

  const maxSkipValue = totalProfiles - profilesCount
  const skipValue =
    maxSkipValue > 0 ? Math.floor(Math.random() * maxSkipValue) : 0

  const randomRecords = await prisma.profile.findMany({
    take: profilesCount,
    where: {
      state: PublishingState.APPROVED,
    },
    orderBy: {
      id: 'asc',
    },
    skip: skipValue,
    include: includeObject.include,
  })

  return randomRecords.map(serializeProfileToProfileModel)
}

export async function getTeamProfiles() {
  const teamProfiles = await prisma.profile.findMany({
    where: {
      user: {
        roles: {
          has: Role.TEAM,
        },
      },
    },
    include: includeObject.include,
  })
  return teamProfiles.map(serializeProfileToProfileModel)
}

// Reusable include object for retrieving Profile with all of its relationships
export const includeObject = Prisma.validator<Prisma.ProfileArgs>()({
  include: {
    user: {
      include: {
        githubDetails: true,
      },
    },
    country: true,
    city: true,
    techStack: true,
  },
})
