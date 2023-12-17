import { NextRequest, NextResponse } from 'next/server'
import { deleteUserProfileByEmail } from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'

export async function DELETE(request: NextRequest) {
  try {
    const { email } = await authorizeUser()

    await deleteUserProfileByEmail(email)

    return new NextResponse('Misior has left the game', { status: 200 })
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`${error}`, { status: 500 })
  }
}
