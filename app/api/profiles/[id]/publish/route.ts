import { NextRequest, NextResponse } from 'next/server'
import { updateUserData } from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'

export async function POST(request: NextRequest, id: string) {
  try {
    await authorizeUser()

    const updatedUser = await updateUserData(id, { isPublished: true })

    return NextResponse.json({
      message: 'Success',
      profile: updatedUser,
    })
  } catch (error) {
    return new NextResponse('Something Went Wrong')
  }
}
