/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import {
  createUserProfile,
  getPublishedProfilesPayload,
  isUserProfileExist,
} from '../../../backend/profile/profile.service'
import { CreateProfilePayload } from '../../../backend/profile/profile.types'

export async function GET(request: NextApiRequest, response: NextApiResponse) {
  try {
    const serializedProfiles = await getPublishedProfilesPayload()

    return NextResponse.json({
      message: 'Succes',
      profile: serializedProfiles,
    })
  } catch (error) {
    return new Response('Something went wrong')
  }
}

export async function POST(request: Request) {
  try {
    const userData: CreateProfilePayload = await request.json()

    const foundUser = await isUserProfileExist(userData)

    if (!foundUser) {
      //create user
      const newUser = await createUserProfile(userData)

      return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } else {
      return new NextResponse('Such user arleady exist', { status: 409 })
    }
  } catch (error) {
    return new NextResponse('Something Went Wrong', { status: 500 })
  }
}
