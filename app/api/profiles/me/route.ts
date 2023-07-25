import { NextResponse } from 'next/server'
import { getProfileById } from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'

export async function GET() {
  try {
    const user = await authorizeUser()
    const profile = await getProfileById(user.id)

    if (!profile) {
      return new Response('Profile does not exist', { status: 404 })
    }

    return NextResponse.json({
      message: 'Success',
      profile: profile,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}
