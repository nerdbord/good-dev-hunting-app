import { serializeProfilesToProfilePayload } from './profile.serializer'
import { CreateProfilePayload } from './profile.types'
import { prisma } from '@/lib/prismaClient'
import { Prisma } from '@prisma/client'

export async function getPublishedProfilesPayload() {
  const publishedProfiles = await prisma.profile.findMany({
    where: {
      isPublished: true,
    },
    include: {
      user: true,
      country: true,
      city: true,
    },
  })

  const serializedProfile = publishedProfiles.map((profile) => {
    return serializeProfilesToProfilePayload(profile)
  })
  return serializedProfile
}

export async function getProfileById(id: string) {
  const profileById = await prisma.profile.findFirst({
    where: {
      id,
    },
    include: {
      user: true,
      country: true,
      city: true,
    },
  })

  if (profileById !== null) {
    return serializeProfilesToProfilePayload(profileById)
  }

  // Handle the case when profileById is null
  return null
}

export async function doesUserProfileExist(userId: string) {
  const foundProfile = await prisma.profile.findFirst({
    where: {
      userId,
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
  userId: string,
  profileData: CreateProfilePayload,
) {
  const createdUser = await prisma.profile.create({
    data: {
      user: {
        connect: { id: userId },
      },
      fullName: profileData.fullName,
      linkedIn: profileData.linkedIn,
      bio: profileData.bio,
      country: {
        create: {
          name: profileData.country.name,
          openForRelocation: profileData.country.openForRelocation,
        },
      },
      city: {
        create: {
          name: profileData.city.name,
          openForRelocation: profileData.city.openForRelocation,
        },
      },
      remoteOnly: profileData.remoteOnly,
      position: profileData.position,
      seniority: profileData.seniority,
      techStack: profileData.techStack,
      employmentType: profileData.employmentType,
      isPublished: profileData.isPublished ?? false,
    },
    include: {
      user: true,
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
  //update profile
  const updatedUser = await prisma.profile.update({
    where: {
      id,
    },
    data: userDataToUpdate,
  })

  return updatedUser
}
