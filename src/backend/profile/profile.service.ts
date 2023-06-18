import { serializeProfilesToProfilePayload } from './profile.serializer'
import { CreateProfilePayload, UpdateProfilePayload } from './profile.types'
import { prisma } from '../../../prisma/prismaClient'
import { City, Country } from '@prisma/client'

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

export async function isUserProfileExist(userData: CreateProfilePayload) {
  const foundUser = await prisma.profile.findFirst({
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

async function updateUserCity(userId: string, newCity: City): Promise<void> {
  if (!newCity) return

  await prisma.profile.update({
    where: {
      userId,
    },
    data: {
      city: {
        connectOrCreate: {
          where: {
            id: newCity?.id,
          },
          create: {
            name: newCity.name,
            openForRelocation: true,
          },
        },
      },
    },
  })
}
async function updateUserCountry(
  userId: string,
  newCountry: Country,
): Promise<void> {
  if (!newCountry) return

  await prisma.profile.update({
    where: {
      userId,
    },
    data: {
      country: {
        connectOrCreate: {
          where: {
            id: newCountry?.id,
          },
          create: {
            name: newCountry.name,
            openForRelocation: true,
          },
        },
      },
    },
  })
}
export async function updateUserData(
  id: string,
  userDataToUpdate: UpdateProfilePayload,
) {
  // take oldUserData for comparision
  const user = await getProfileById(id)

  // take city&country and update when is new
  const oldCity = user?.city.name
  const newCity = userDataToUpdate.city?.name
  const oldCountry = user?.country.name
  const newCountry = userDataToUpdate.country?.name

  if (newCity !== oldCity) {
    const foundCity = await prisma.city.findFirst({
      where: {
        name: newCity,
      },
    })

    if (!foundCity) return
    await updateUserCity(id, foundCity)
  }

  if (newCountry !== oldCountry) {
    const foundCountry = await prisma.country.findFirst({
      where: {
        name: newCountry,
      },
    })

    if (!foundCountry) return
    await updateUserCountry(id, foundCountry)
  }

  //update profile
  await prisma.profile.update({
    where: {
      id,
    },
    data: {
      fullName: userDataToUpdate.fullName,
      bio: userDataToUpdate.bio,
      linkedIn: userDataToUpdate.linkedIn,
      email: userDataToUpdate.email,
      employmentType: userDataToUpdate.employmentType,
      position: userDataToUpdate.position,
      isPublished: userDataToUpdate.isPublished,
      remoteOnly: userDataToUpdate.remoteOnly,
      seniority: userDataToUpdate.seniority,
      techStack: userDataToUpdate.techStack,
      user: {
        update: {
          email: userDataToUpdate.email,
        },
      },
    },
  })

  return getProfileById(id)
}
