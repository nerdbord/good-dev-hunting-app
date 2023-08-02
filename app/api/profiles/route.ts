import { NextRequest, NextResponse } from 'next/server'
import {
  createUserProfile,
  doesUserProfileExist,
  getPublishedProfilesPayload,
} from '@/backend/profile/profile.service'
import { CreateProfilePayload } from '@/backend/profile/profile.types'
import { authorizeUser } from '@/lib/auth'

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
      const newUser = await createUserProfile(email, userData)

      return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } else {
      return new NextResponse('Such user already exist', { status: 409 })
    }
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
