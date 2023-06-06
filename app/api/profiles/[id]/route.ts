import { NextResponse } from 'next/server'
import { getProfileById } from '../../../../backend/profile/profile.service'

export async function GET(request: Request, id: string) {
  try {
    const serializedProfilesById = await getProfileById(id)

    return NextResponse.json({
      message: 'Succes',
      profile: serializedProfilesById,
    })
  } catch (error) {
    return new NextResponse('Something went wrong', { status: 500 })
  }
}
