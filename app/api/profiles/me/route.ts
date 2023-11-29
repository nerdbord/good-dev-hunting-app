import { getProfileByUserEmail } from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import {
  updateUserData,
  doesUserProfileExist,
} from '@/backend/profile/profile.service'

import { Prisma, PublishingState } from '@prisma/client'
import { CreateProfilePayload } from '@/data/frontend/profile/types'

export async function GET() {
  try {
    const { email } = await authorizeUser()
    const userProfile = await getProfileByUserEmail(email)

    return NextResponse.json({
      message: 'Success',
      profile: userProfile,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedDataPayload: CreateProfilePayload = await request.json()
    const { email } = await authorizeUser()

    const foundProfile = await doesUserProfileExist(email)

    if (foundProfile) {
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
        state: PublishingState.PENDING,
      }

      const updatedUser = await updateUserData(foundProfile.id, updatedData)

      return new NextResponse(JSON.stringify(updatedUser), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      })
    } else {
      return new NextResponse('User does not exist', { status: 404 })
    }
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
