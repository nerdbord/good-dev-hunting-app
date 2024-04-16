import { prisma } from '@/lib/prismaClient'
import { type Role } from '@prisma/client'

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
    return userById
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

export async function findUserById(id: string) {
  const foundUser = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      githubDetails: true,
      profile: true,
    },
  })

  return foundUser
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
    include: {
      githubDetails: true,
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
    include: {
      githubDetails: true,
    },
  })
}

export async function updateAvatar(email: string, avatarUrl: string) {
  return await prisma.user.update({
    where: { email },
    data: { avatarUrl },
  })
}

export async function updateUserNerdbordId(userId: string, nerdbordId: string) {
  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      nerdbordUserId: nerdbordId,
    },
    include: {
      githubDetails: true,
    },
  })

  return updatedUser
}
