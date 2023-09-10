import { NextRequest, NextResponse } from 'next/server'
import {
  getProfileById,
  updateUserData,
} from '@/backend/profile/profile.service'
import { authorizeUser } from '@/lib/auth'

// export async function POST(request: NextRequest, id: string) {
//   try {
//     await authorizeUser()

//     const existingProfile = await getProfileById(id)

//     if (!existingProfile) {
//       return new NextResponse('Profile not found')
//     }

//     const updateUserProfileById = await updateUserData(id, {
//       isPublished: !existingProfile.isPublished
//     })

//     return NextResponse.json({
//       message: 'Success',
//       profile: updateUserProfileById,
//     })
//   } catch (error) {
//     return new NextResponse(`Error: ${(error as Error).message}`);
//   }
// }

export async function POST(request: NextRequest, id: string) {
  try {
    await authorizeUser()

    await updateUserData(id, {
      isPublished: true,
    })

    return NextResponse.json({
      message: 'Success',
    })
  } catch (error) {
    return new NextResponse(`Error: ${(error as Error).message}`)
  }
}
