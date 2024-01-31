import { sendProfileStatusEmail } from '@/actions/mailing/sendProfileStatusEmail'
import { updateUserData } from '@/backend/profile/profile.service'
import { getUserById } from '@/backend/user/user.service'
import { PublishingStateData } from '@/data/frontend/profile/types'
import { requireUserRoles } from '@/utils/auths'
import { Role } from '@prisma/client'
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
    const userData = await getUserById(id)
    if (userData) {
      const updatedProfileStateMail = await sendProfileStatusEmail(
        userData.email,
        userDataToUpdate.state,
      )
    } else {
      throw new Error(
        `Couldn't send notification email, userData is: ${userData}`,
      )
    }

    return NextResponse.json({
      message: 'Success',
      profile: updatedProfileState,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
