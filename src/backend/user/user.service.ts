import { sendDiscordNotificationToModeratorChannel } from '@/lib/discord'
import { mailerliteClient, mailerliteGroups } from '@/lib/mailerliteClient'
import { prisma } from '@/lib/prismaClient'
import { Prisma, Role } from '@prisma/client'
import { serializeUserToUserPayload } from './user.serializer'
import { CreateUserPayload } from './user.types'

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

export async function findUserByEmail(email: string) {
  const foundUser = await prisma.user.findUnique({
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

export async function findUserByGithubCredentials(
  username: string,
  email: string,
) {
  const foundUserByUsername = await findUserByGithubUsername(username)
  if (!foundUserByUsername) {
    const foundUserByEmail = await findUserByEmail(email)
    if (!foundUserByEmail) {
      return null
    }
    await prisma.gitHubDetails.update({
      data: { username },
      where: { id: foundUserByEmail.githubDetails?.id },
    })
    return foundUserByEmail
  }
  if (email !== foundUserByUsername.user.email) {
    await prisma.user.update({
      data: {
        email,
      },
      where: {
        id: foundUserByUsername.user.id,
      },
    })
  }
  // formatting the user in a way so it would certainly return the same value as usual (by usual i mean findUserByEmail return value)
  const foundUser = {
    ...foundUserByUsername.user,
    profile: foundUserByUsername.user.profile,
    githubDetails: { ...foundUserByUsername, user: undefined },
  }
  return foundUser
}

export async function findUserByGithubUsername(username: string) {
  const foundUser = await prisma.gitHubDetails.findUnique({
    where: {
      username,
    },
    include: {
      user: {
        include: {
          profile: true,
        },
      },
    },
  })
  return foundUser
}

export async function doesUserExist(email: string) {
  const foundUser = await findUserByEmail(email)

  return !!foundUser
}

export const findOrCreateUser = async (data: {
  email: string
  username: string
  imageSrc: string
}) => {
  const foundUser = await prisma.user.findFirst({
    where: { email: data.email },
  })

  if (foundUser) {
    return foundUser
  }

  const createdUser = await prisma.user.create({
    data: {
      email: data.email,
      avatarUrl: data.imageSrc,
      githubDetails: {
        create: {
          username: data.username,
        },
      },
    },
    include: {
      githubDetails: true,
    },
  })
  await mailerliteClient.addSubscriberToMailerLite(
    data.email,
    mailerliteGroups.devGroup,
  )
  await sendDiscordNotificationToModeratorChannel(
    `User ${createdUser.email} has created an account`,
  )
  return createdUser
}

export async function createUser(payload: CreateUserPayload) {
  const createdUser = await prisma.user.create({
    data: {
      email: payload.email,
      avatarUrl: payload.image,
      githubDetails: {
        create: {
          username: payload.githubUsername,
        },
      },
    },
    include: {
      githubDetails: true,
    },
  })

  return createdUser
}

export async function updateUserData(
  email: string,
  userDataToUpdate: Prisma.ProfileUpdateInput,
) {
  const updatedUser = await prisma.user.update({
    where: {
      email,
    },
    data: userDataToUpdate,
  })

  return updatedUser
}

export async function addUserRole(id: string, role: Role) {
  const foundUser = await getUserById(id)

  if (!foundUser) {
    return null
  }

  const isRoleAlreadyAssigned = foundUser.roles.includes(role)

  if (isRoleAlreadyAssigned) {
    return foundUser
  }

  const updatedRoles = [...foundUser.roles, role]

  return await prisma.user.update({
    where: { id },
    data: {
      roles: {
        set: updatedRoles,
      },
    },
  })
}

export async function removeUserRole(id: string, role: Role) {
  const foundUser = await getUserById(id)

  if (!foundUser) {
    return null
  }

  const updatedRoles = foundUser.roles.filter((userRole) => userRole !== role)

  return await prisma.user.update({
    where: { id },
    data: {
      roles: {
        set: updatedRoles,
      },
    },
  })
}

export async function updateAvatar(email: string, avatarUrl: string) {
  return await prisma.user.update({
    where: { email },
    data: { avatarUrl },
  })
}

export async function getGitHubDetails(id: string) {
  const userGitHubDetails = await prisma.gitHubDetails.findUnique({
    where: {
      userId: id,
    },
  })

  return userGitHubDetails
}

export async function updateUserNerdbordId(userId: string, nerdbordId: string) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      nerdbordUserId: nerdbordId,
    },
  })

  return updatedUser
}
