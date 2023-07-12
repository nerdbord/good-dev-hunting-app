import { prisma } from '@/lib/prismaClient'
import { Prisma } from '@prisma/client'
import { serializeUserToUserPayload } from './user.serializer'

export async function getUsersPayload() {
  const users = await prisma.user.findMany({
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  const serializedProfile = users.map((user) => {
    return serializeUserToUserPayload(user)
  })
  return serializedProfile
}

export async function getUserById(id: string) {
  const userById = await prisma.user.findFirst({
    where: {
      id,
    },
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  if (userById !== null) {
    return serializeUserToUserPayload(userById)
  }

  // Handle the case when profileById is null
  return null
}

export async function doesUserExist(email: string) {
  const foundUser = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  return foundUser
}

export async function createUser(userDataFromGh: CreateUserPayload) {
  const createdUser = await prisma.user.create({
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
