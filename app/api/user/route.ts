import { NextRequest, NextResponse } from 'next/server'
import {
  createUser,
  doesUserExist,
  getUsersPayload,
} from '@/backend/user/user.service'
import { CreateUserPayload } from '@/backend/user/user.types'

export async function GET() {
  try {
    const serializedUsers = await getUsersPayload()

    return NextResponse.json({
      message: 'Success',
      profile: serializedUsers,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const userData: CreateUserPayload = await request.json()

    // We will need to validate this using authorized user token, instead of sent payload
    // const USER_TOKEN_FROM_COOKIE_OR_REQUEST_HEADER = 'non existing yet'

    const foundUser = await doesUserExist(
      userData.email,
      // USER_TOKEN_FROM_COOKIE_OR_REQUEST_HEADER,
    )

    if (!foundUser) {
      const newUser = await createUser(
        // USER_TOKEN_FROM_COOKIE_OR_REQUEST_HEADER,
        userData,
      )

      return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } else {
      return new NextResponse('Such user already exist', { status: 409 })
    }
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 })
  }
}
