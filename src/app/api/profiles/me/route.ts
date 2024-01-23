import {
  doesUserProfileExist,
  getProfileByUserEmail,
  updateUserData,
} from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

import { CreateProfilePayload } from '@/data/frontend/profile/types'
import { Prisma, PublishingState } from '@prisma/client'

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
      const updatedData: Prisma.ProfileUpdateInput = {
        fullName: updatedDataPayload.fullName,
        linkedIn: updatedDataPayload.linkedIn,
        bio: updatedDataPayload.bio,
        country: {
          connectOrCreate: {
            create: {
              name: updatedDataPayload.country.name,
            },
            where: { name: updatedDataPayload.country.name },
          },
        },
        openForCountryRelocation: updatedDataPayload.openForCountryRelocation,
        city: {
          connectOrCreate: {
            create: {
              name: updatedDataPayload.city.name,
            },
            where: { name: updatedDataPayload.city.name },
          },
        },
        openForCityRelocation: updatedDataPayload.openForCityRelocation,
        remoteOnly: updatedDataPayload.remoteOnly,
        position: updatedDataPayload.position,
        seniority: updatedDataPayload.seniority,
        techStack: {
          connectOrCreate: updatedDataPayload.techStack.map((tech) => {
            return {
              create: {
                techName: tech.techName,
              },
              where: {
                techName: tech.techName,
              },
            }
          }),
        },
        employmentType: updatedDataPayload.employmentType,
        state: PublishingState.PENDING,
      }

      const updatedUser = await updateUserData(foundProfile.id, updatedData)

      return NextResponse.json(updatedUser, { status: 200 })
    } else {
      return new NextResponse('User does not exist', { status: 404 })
    }
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
