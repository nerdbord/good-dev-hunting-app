import { sendProfileRejectedEmail } from '@/actions/mailing/sendProfileStatusEmail'
import {
  deleteRejectingReason,
  saveRejectingReason,
} from '@/backend/profile/rejection.service'
import { requireUserRoles } from '@/utils/auths'
import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST({
  request,
  params: { id: profileId },
}: {
  request: NextRequest
  params: { id: string }
}) {
  if (!requireUserRoles([Role.MODERATOR])) {
    return new NextResponse(null, { status: 401 })
  }

  try {
    const { email, reason } = await request.json()
    const createdReason = await saveRejectingReason(profileId, reason)

    try {
      await sendProfileRejectedEmail(email, reason)
    } catch (error) {
      await deleteRejectingReason(createdReason.id)

      return responseWithErrorMessage(error)
    }

    return NextResponse.json({
      message: 'Success',
      createdReason,
    })
  } catch (error) {
    return responseWithErrorMessage(error)
  }
}

function responseWithErrorMessage(error: unknown) {
  return new NextResponse(JSON.stringify(error))
}
