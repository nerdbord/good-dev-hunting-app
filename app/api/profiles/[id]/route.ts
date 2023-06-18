import { NextRequest, NextResponse } from 'next/server'
import {
  getProfileById,
  updateUserData,
} from '@/backend/profile/profile.service'

export async function GET(request: Request, id: string) {
  try {
    const serializedProfile = await getProfileById(id)

    return NextResponse.json({
      message: 'Success',
      profile: serializedProfile,
    })
  } catch (error) {
    return new NextResponse('Something Went Wrong')
  }
}

export async function PATCH(request: NextRequest, id: string) {
  try {
    const userDataToUpdate = await request.json()
    const updatedUser = await updateUserData(id, userDataToUpdate)

    return NextResponse.json({
      message: 'Success',
      profile: updatedUser,
    })
  } catch (error) {
    return new NextResponse(`${error}`)
  }
}
