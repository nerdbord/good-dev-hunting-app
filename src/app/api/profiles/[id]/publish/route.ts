import {
  getProfileById,
  updateUserData,
} from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'
import { PublishingState } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  idObj: { params: { id: string } },
) {
  const id = idObj.params.id
  try {
    await authorizeUser()

    const existingProfile = await getProfileById(id)

    if (!existingProfile) {
      return new NextResponse('Profile not found', { status: 404 })
    }

    const updateUserProfileById = await updateUserData(id, {
      state: PublishingState.PENDING,
    })

    const serializedProfile = JSON.stringify(updateUserProfileById)
    return new NextResponse(serializedProfile, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.log('Error:', error)
    return new NextResponse(`Error: ${(error as Error).message}`, {
      status: 500,
    })
  }
}
