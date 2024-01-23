import {
  getProfileById,
  updateUserData,
} from '@/backend/profile/profile.service'
import { ProfileModelSimplified } from '@/data/frontend/profile/types'
import { authorizeUser } from '@/lib/auth'
import { PublishingState } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, profileId: string) {
  try {
    await authorizeUser()

    const serializedProfile = await getProfileById(profileId)

    return NextResponse.json({
      message: 'Success',
      profile: serializedProfile,
    })
  } catch (error) {
    return new NextResponse('Something Went Wrong')
  }
}

export async function PATCH(request: NextRequest, id: string) {
  try {
    const userDataToUpdate: ProfileModelSimplified = await request.json()
    const updatedUser = await updateUserData(id, {
      fullName: userDataToUpdate.fullName,
      remoteOnly: userDataToUpdate.remoteOnly,
      bio: userDataToUpdate.bio,
      position: userDataToUpdate.position,
      seniority: userDataToUpdate.seniority,
      state: PublishingState.PENDING,
      employmentType: userDataToUpdate.employmentType,
      techStack: {
        connectOrCreate: userDataToUpdate.techStack.map((tech) => {
          return {
            create: {
              techName: tech,
            },
            where: {
              techName: tech,
            },
          }
        }),
      },
      country: {
        connectOrCreate: {
          where: {
            name: userDataToUpdate.country.name,
          },
          create: {
            name: userDataToUpdate.country.name,
          },
        },
      },
      openForCountryRelocation: userDataToUpdate.openForCountryRelocation,
      city: {
        update: {
          name: userDataToUpdate.city.name,
        },
      },
      openForCityRelocation: userDataToUpdate.openForCityRelocation,
    })
    return NextResponse.json({
      message: 'Success',
      profile: updatedUser,
    })
  } catch (error) {
    return new NextResponse(`${error}`)
  }
}
