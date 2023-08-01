import { NextRequest, NextResponse } from 'next/server'
import {
  getProfileById,
  updateUserData,
} from '@/backend/profile/profile.service'
import { ProfilePayload } from '@/backend/profile/profile.types'
import { authorizeUser } from '@/lib/auth'

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
