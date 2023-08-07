import { NextRequest, NextResponse } from 'next/server'
import { updateUserData } from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'

export async function POST(request: NextRequest, id: string) {
  try {
    await authorizeUser()

    const updateUserProfileById = await updateUserData(id, { isPublished: true })

    return NextResponse.json({
      message: 'Success',
      profile: updateUserProfileById,
    })
  } catch (error) {
    return new NextResponse('Something Went Wrong')
  }
}
