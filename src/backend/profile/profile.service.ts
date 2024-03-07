import {
  type JobOfferFiltersEnum,
  type ProfilePayload,
} from '@/app/(profile)/types'
import { prisma } from '@/lib/prismaClient'
import shuffleArray from '@/utils/collections'
import {
  Prisma,
  PublishingState,
  Role,
  type EmploymentType,
} from '@prisma/client'
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
  profileData: ProfilePayload,
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
          where: { name: tech.name },
          create: {
            name: tech.name,
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

export const validateIfProfileWasContactedXTimesInLastYMinutes = async (
  profileId: string,
  minutes: number,
  times: number,
) => {
  const contactedCount = await prisma.contactRequest.count({
    where: {
      profileId,
      createdAt: {
        gte: new Date(new Date().getTime() - minutes * 60 * 1000),
      },
    },
  })

  return contactedCount >= times
}

export const findGithubUsernameByProfileId = async (profileId: string) => {
  const profile = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
    include: {
      user: {
        include: {
          githubDetails: true,
        },
      },
    },
  })

  if (!profile?.user.githubDetails?.username) {
    throw new Error('User does not have a GitHub username')
  }

  return profile.user.githubDetails.username
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

export async function getProfileByGithubUsername(username: string) {
  const profile = await prisma.profile.findFirst({
    where: { user: { githubDetails: { username } } },
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
  payload: ProfilePayload,
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

export async function getRandomProfiles(take: number) {
  // Retrieve IDs of all approved profiles
  const approvedProfileIds = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    select: {
      id: true, // Only select the ID
    },
  })

  const totalProfiles = approvedProfileIds.length

  if (take >= totalProfiles) {
    // If requesting more profiles than available, return all without randomization
    return getPublishedProfiles(totalProfiles)
  }

  // Shuffle the array of IDs and select the first `profilesCount` elements
  const shuffledIds = shuffleArray(approvedProfileIds)
    .slice(0, take)
    .map((p) => p.id)

  // Fetch the full profile details for the randomly selected IDs
  const randomProfiles = await prisma.profile.findMany({
    where: {
      id: {
        in: shuffledIds,
      },
    },
    take,
    include: includeObject.include, // Ensure this is correctly defined
  })

  return randomProfiles.map(serializeProfileToProfileModel)
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

export async function getUniqueSpecializations() {
  const uniqueSpecializations = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    select: {
      position: true,
    },
    distinct: ['position'],
  })

  return uniqueSpecializations.map((p) => p.position)
}

export async function incrementProfileViewCountById(id: string) {
  const updatedProfile = await prisma.profile.update({
    where: {
      id,
    },
    data: { viewCount: { increment: 1 } },
  })
}

export async function countProfilesForPositionsByFilters(
  filters: Record<JobOfferFiltersEnum, string>,
) {
  const { seniority, location, technology, availability } = filters

  const query: Prisma.ProfileWhereInput = {
    state: PublishingState.APPROVED,
    ...(seniority && { seniority: { in: seniority.split(',') } }),
    ...(location && { country: { name: location } }),
    ...(technology && {
      techStack: { some: { name: { in: technology.split(',') } } },
    }),
    ...(availability && {
      employmentTypes: { hasSome: availability.split(',') as EmploymentType[] },
    }),
  }

  const positions = await getUniqueSpecializations()
  const counts: Record<string, number> = {}

  for (const position of positions) {
    const count = await prisma.profile.count({
      where: {
        ...query,
        position,
      },
    })
    counts[position] = count
  }

  return counts
}
