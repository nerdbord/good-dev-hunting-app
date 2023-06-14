import { NextResponse } from 'next/server'
import { getProfileById } from '@/backend/profile/profile.service'

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
