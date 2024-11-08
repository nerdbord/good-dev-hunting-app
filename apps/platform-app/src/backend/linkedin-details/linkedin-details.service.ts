import { prisma } from '@/lib/prismaClient'

export const findLinkedinUsernamesByUsernameBase = async (
  baseUsername: string,
): Promise<string[]> => {
  const usernames = await prisma.linkedInDetails.findMany({
    where: {
      username: {
        startsWith: baseUsername,
      },
    },
    select: {
      username: true,
    },
  })

  return usernames.map(
    (usernameObject: { username: string }) => usernameObject.username,
  )
}

export async function createLinkedInDetailsForUser(
  userId: string,
  username: string,
) {
  // Check if the user exists and does not have LinkedInDetails
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { linkedinDetails: true },
  })

  if (!user) {
    throw new Error('User not found')
  }

  if (user.linkedinDetails) {
    throw new Error('User already has LinkedIn details')
  }

  // Create LinkedInDetails for the user
  const linkedInDetails = await prisma.linkedInDetails.create({
    data: {
      userId: userId,
      username: username,
    },
  })

  return linkedInDetails
}
