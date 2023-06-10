/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import { getPublishedProfilesPayload } from '../../../backend/profile/profile.service'
import { prisma } from '../../../prisma/prismaClient'
import {
  CreateProfilePayload,
  ProfileDataFromPrisma,
  ProfilePayload,
} from '../../../backend/profile/profile.types'

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
    const body: CreateProfilePayload = await request.json()
    console.log(body)

    //call db
    //check user by mail
    const foundUser: ProfileDataFromPrisma = await prisma.profile.findFirst({
      where: {
        OR: [
          { email: body.email },
          //check full name?
          { fullName: body.fullName },
          //check linkenIn validation?
          { linkedIn: body.linkedIn },
        ],
      },
      include: {
        user: true,
        country: true,
        city: true,
      },
    })
    console.log(foundUser)

    if (!foundUser) {
      //create user
      const newUser = 'user'
      return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } else {
      return new NextResponse('Such user arleady exist', { status: 409 })
    }

    //return this user data
  } catch (error) {
    return new NextResponse('Something Went Wrong', { status: 500 })
  }
}
