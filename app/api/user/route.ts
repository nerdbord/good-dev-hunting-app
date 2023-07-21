import { NextRequest, NextResponse } from 'next/server'
import {
  createUser,
  doesUserExist,
  getUsersPayload,
} from '@/backend/user/user.service'
import { CreateUserPayload } from '@/backend/user/user.types'
import { authorizeUser } from '@/lib/auth'

export async function GET() {
  try {
    await authorizeUser()

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
    await authorizeUser()
    const userData: CreateUserPayload = await request.json()

    const foundUser = await doesUserExist(userData.email)

    if (!foundUser) {
      const newUser = await createUser(userData)

      return new NextResponse(JSON.stringify(newUser), { status: 201 })
    } else {
      return new NextResponse('Such user already exist', { status: 409 })
    }
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 })
  }
}
