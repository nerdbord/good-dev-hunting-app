import { type ProfileCreateParams } from '@/app/[locale]/(profile)/profile.types'
import { prisma } from '@/lib/prismaClient'
import { Prisma, PublishingState, Role, type Profile } from '@prisma/client'

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
      slug: profileData.slug,
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
      currency: profileData.currency,
      language: {
        connectOrCreate: profileData.language.map((lang) => ({
          where: { name: lang.name },
          create: { name: lang.name },
        })),
      },
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
    include: includeObject.include,
  })

  return updatedProfile
}

export const findGithubUsernameByProfileId = async (
  profileId: Profile['id'],
) => {
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
    return null
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
export async function getProfileBySlug(slug: Profile['slug']) {
  const profile = await prisma.profile.findFirst({
    where: { slug },
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
    contactRequests: true,
    profileViews: true,
    language: true,
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

export async function createProfileView(
  viewerId: string,
  viewedProfileId: string,
) {
  const newProfileView = await prisma.profileView.create({
    data: {
      viewerId,
      viewedProfileId,
    },
  })

  return newProfileView
}

export async function updateProfileView(id: string) {
  const updatedProfileView = await prisma.profileView.update({
    where: {
      id,
    },
    data: {
      createdAt: new Date(),
    },
  })

  return updatedProfileView
}

export async function findProfileViewByViewerIdAndProfileId(
  viewerId: string,
  viewedProfileId: string,
) {
  const profileView = await prisma.profileView.findFirst({
    where: {
      viewerId,
      viewedProfileId,
    },
  })

  return profileView
}
