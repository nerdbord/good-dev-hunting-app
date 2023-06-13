import { serializeProfilesToProfilePayload } from './profile.serializer'
import { prisma } from '../../prisma/prismaClient'
import { CreateProfilePayload, ProfileDataFromPrisma } from './profile.types'

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

  return serializeProfilesToProfilePayload(profileById)
}

export async function isUserProfileExist(userData: CreateProfilePayload) {
  const foundUser: ProfileDataFromPrisma = await prisma.profile.findFirst({
    where: {
      OR: [
        { email: userData.email },
        //check full name?
        { fullName: userData.fullName },
        //check linkenIn validation?
        { linkedIn: userData.linkedIn },
      ],
    },
    include: {
      user: true,
      country: true,
      city: true,
    },
  })

  return foundUser
}

export async function createUserProfile(profileData: CreateProfilePayload) {
  const createdUser = await prisma.profile.create({
    data: {
      user: {
        create: {
          email: profileData.email,
        },
      },
      fullName: profileData.fullName,
      email: profileData.email,
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
      isPublished: profileData.isPublished,
    },
    include: {
      user: true,
      country: true,
      city: true,
    },
  })
  return createdUser
}
