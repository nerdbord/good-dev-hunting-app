import { NextRequest, NextResponse } from 'next/server'
import {
  createUserProfile,
  doesUserProfileExist,
  getPublishedProfilesPayload,
} from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'
import { serializeProfileToProfileModel } from '@/backend/profile/profile.serializer'
import { CreateProfilePayload } from '@/data/frontend/profile/types'

export async function GET() {
  try {
    const serializedProfiles = await getPublishedProfilesPayload()

    return NextResponse.json({
      message: 'Success',
      profile: serializedProfiles,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData: CreateProfilePayload = await request.json()

    const { email } = await authorizeUser()

    const foundUser = await doesUserProfileExist(email)

    if (!foundUser) {
      const createdProfile = await createUserProfile(email, userData)

      const serializedProfile = serializeProfileToProfileModel(createdProfile)

      return new NextResponse(JSON.stringify(serializedProfile), {
        status: 201,
      })
    } else {
      return new NextResponse('Such user already exist', { status: 409 })
    }
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
