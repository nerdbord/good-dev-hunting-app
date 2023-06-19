import { serializeProfilesToProfilePayload } from './profile.serializer'
import { CreateProfilePayload, UpdateProfilePayload } from './profile.types'
import { prisma } from '../../../prisma/prismaClient'
import { Country } from '@prisma/client'

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

async function updateUserCity(
  userId: string,
  newCity:
    | {
        name: string
        openForRelocation: boolean
      }
    | undefined,
): Promise<void> {
  //check city, if its true:
  if (newCity) {
    const foundCity = await prisma.city.findFirst({
      where: {
        name: newCity.name,
      },
    })

    if (foundCity) {
      await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          city: {
            update: {
              id: foundCity.id,
              name: foundCity.name,
              openForRelocation: foundCity.openForRelocation,
            },
          },
        },
      })
    } else {
      await prisma.profile.update({
        where: {
          userId,
        },
        data: {
          city: {
            create: {
              name: newCity.name,
              openForRelocation: newCity.openForRelocation,
            },
          },
        },
      })
    }
  }
}

async function updateUserCountry(
  userId: string,
  newCountry: Country | null,
): Promise<void> {
  if (newCountry) {
    await prisma.profile.update({
      where: {
        userId,
      },
      data: {
        city: {
          upsert: {
            update: {
              ...newCountry,
            },
            create: {
              name: newCountry.name,
              openForRelocation: newCountry.openForRelocation,
            },
          },
        },
      },
    })
  }
}

export async function updateUserData(
  id: string,
  userDataToUpdate: UpdateProfilePayload,
) {
  const newCity = userDataToUpdate.city
  const newCountry = userDataToUpdate

  const foundCountry = await prisma.country.findFirst({
    where: {
      name: newCountry.country?.name,
    },
  })

  await updateUserCity(id, newCity)
  await updateUserCountry(id, foundCountry)

  //update profile
  const updatedUser = await prisma.profile.update({
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

  return updatedUser
}
