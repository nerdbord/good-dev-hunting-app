import { getProfileByUserId } from '@/backend/profile/profile.service'
import { NextResponse } from 'next/server'
import { authorizeUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await authorizeUser()

    const userProfile = await getProfileByUserId(user.id)

    return NextResponse.json({
      message: 'Success',
      profile: userProfile,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}
