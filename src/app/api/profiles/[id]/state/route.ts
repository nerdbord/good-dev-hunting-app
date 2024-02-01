import { sendProfileApprovedEmail } from '@/actions/mailing/sendProfileStatusEmail'
import { updateUserData } from '@/backend/profile/profile.service'
import { PublishingStateData } from '@/data/frontend/profile/types'
import { requireUserRoles } from '@/utils/auths'
import { PublishingState, Role } from '@prisma/client'
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
    const updatedProfile = await updateUserData(id, userDataToUpdate)
    if (updatedProfile.state === PublishingState.APPROVED) {
      await sendProfileApprovedEmail(updatedProfile.user.email)
    }
    return NextResponse.json({
      message: 'Success',
      profile: updatedProfile,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
