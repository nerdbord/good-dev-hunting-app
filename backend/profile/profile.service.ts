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

  return foundUser ? true : false
}

export async function createUserProfile(profieData: CreateProfilePayload) {
  const userCityInfo = {
    name: profieData.city.name,
    openForRelocation: profieData.city.openForRelocation,
  }
  const userCountryInfo = {
    name: profieData.country.name,
    openForRelocation: profieData.country.openForRelocation,
  }

  const result = await prisma.profile.create({
    data: {
      userId: '123',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      linkedIn: 'linkedin.com/in/johndoe',
      bio: 'Lorem ipsum dolor sit amet.',
      country: {
        create: {
          ...userCountryInfo,
        },
      },
      city: {
        create: {
          ...userCityInfo,
        },
      },
      remoteOnly: false,
      position: 'Software Engineer',
      seniority: 'Senior',
      techStack: ['JavaScript', 'React', 'Node.js'],
      employmentType: 'FULL_TIME',
      isPublished: true,
    },
  })

  //fix it
  // const newUser = await prisma.profile.create({ select: { ...userData } })
}
