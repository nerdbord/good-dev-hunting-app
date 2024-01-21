import { updateUserData } from '@/backend/profile/profile.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { PublishingStateData } from '@/data/frontend/profile/types'
import { authOptions } from '@/lib/auth'
import { requireUserRoles } from '@/utils/auths'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id

  if (!requireUserRoles([Role.MODERATOR])) {
    return new NextResponse(null, { status: 401 })
  }

  try {
    const userDataToUpdate: PublishingStateData = await request.json()
    const updatedProfileState = await updateUserData(id, userDataToUpdate)

    return NextResponse.json({
      message: 'Success',
      profile: updatedProfileState,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
