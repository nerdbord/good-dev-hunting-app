import { NextRequest, NextResponse } from 'next/server'
import {
  updateUserData,
  doesUserProfileExist,
  getProfileById,
} from '@/backend/profile/profile.service'
import {
  CreateProfilePayload,
  ProfilePayload,
} from '@/backend/profile/profile.types'
import { authorizeUser } from '@/lib/auth'
import { Prisma } from '@prisma/client'

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
    const userDataToUpdate: ProfilePayload = await request.json()
    const updatedUser = await updateUserData(id, {
      fullName: userDataToUpdate.fullName,
      remoteOnly: userDataToUpdate.remoteOnly,
      bio: userDataToUpdate.bio,
      position: userDataToUpdate.position,
      seniority: userDataToUpdate.seniority,
      isPublished: userDataToUpdate.isPublished,
      employmentType: userDataToUpdate.employmentType,
      techStack: userDataToUpdate.techStack,
      country: {
        update: {
          name: userDataToUpdate.country.name,
          openForRelocation: userDataToUpdate.country.openForRelocation,
        },
      },
      city: {
        update: {
          name: userDataToUpdate.city.name,
          openForRelocation: userDataToUpdate.city.openForRelocation,
        },
      },
    })

    return NextResponse.json({
      message: 'Success',
      profile: updatedUser,
    })
  } catch (error) {
    return new NextResponse(`${error}`)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedDataPayload: CreateProfilePayload = await request.json()
    const { email } = await authorizeUser()

    const foundUser = await doesUserProfileExist(email)

    if (foundUser) {
      // Convert CreateProfilePayload to Prisma.ProfileUpdateInput
      const updatedData: Prisma.ProfileUpdateInput = {
        fullName: updatedDataPayload.fullName,
        linkedIn: updatedDataPayload.linkedIn,
        bio: updatedDataPayload.bio,
        country: {
          update: {
            name: updatedDataPayload.country.name,
            openForRelocation: updatedDataPayload.country.openForRelocation,
          },
        },
        city: {
          update: {
            name: updatedDataPayload.city.name,
            openForRelocation: updatedDataPayload.city.openForRelocation,
          },
        },
        remoteOnly: updatedDataPayload.remoteOnly,
        position: updatedDataPayload.position,
        seniority: updatedDataPayload.seniority,
        techStack: updatedDataPayload.techStack,
        employmentType: updatedDataPayload.employmentType,
        isPublished: updatedDataPayload.isPublished ?? false,
      }

      const updatedUser = await updateUserData(foundUser.id, updatedData)

      return new NextResponse(JSON.stringify(updatedUser), { status: 200 })
    } else {
      return new NextResponse('User does not exist', { status: 404 })
    }
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
