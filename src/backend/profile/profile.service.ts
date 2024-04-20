import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { type ProfileCreateParams } from '@/app/(profile)/profile.types'
import { prisma } from '@/lib/prismaClient'
import { Currency, Prisma, PublishingState, Role } from '@prisma/client'

export async function getApprovedProfiles() {
  const approvedProfiles = await prisma.profile.findMany({
    where: {
      state: PublishingState.APPROVED,
    },
    include: includeObject.include,
  })

  return approvedProfiles
}

export async function getAllProfiles() {
  const allProfiles = await prisma.profile.findMany({
    include: includeObject.include,
  })

  return allProfiles
}

export async function getProfileById(id: string) {
  const profileById = await prisma.profile.findUniqueOrThrow({
    where: {
      id,
    },
    include: includeObject.include,
  })

  return profileById
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
  profileData: ProfileCreateParams,
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
            name: profileData.country,
          },
          where: {
            name: profileData.country,
          },
        },
      },
      openForCountryRelocation: profileData.openForCountryRelocation,
      city: {
        connectOrCreate: {
          create: {
            name: profileData.city,
          },
          where: {
            name: profileData.city,
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
      hourlyRateMin: profileData.hourlyRateMin ?? 0,
      hourlyRateMax: profileData.hourlyRateMax ?? 0,
      currency: Currency.PLN,
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
      user: {
        include: {
          githubDetails: true,
        },
      },
      techStack: true,
      country: true,
      city: true,
    },
  })

  return updatedProfile
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
    return profile
  }

  return null
}

export async function getProfileByUserId(userId: string) {
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: includeObject.include,
  })

  if (profile) {
    return profile
  }

  return null
}

export async function getProfileByGithubUsername(username: string) {
  const profile = await prisma.profile.findFirst({
    where: { user: { githubDetails: { username } } },
    include: includeObject.include,
  })

  if (profile) {
    return profile
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

  return publishedProfiles
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
  return teamProfiles
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
  return updatedProfile
}
