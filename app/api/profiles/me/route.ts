import { getProfileByUserId } from '@/backend/profile/profile.service'
import { NextRequest, NextResponse } from 'next/server'
import { authorizeUser } from '@/lib/auth'

export async function GET() {
  try {
    const { email } = await authorizeUser()

    const userProfile = await getProfileByUserId(email)

    return NextResponse.json({
      message: 'Success',
      profile: userProfile,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}
