import { sendProfileRejectedEmail } from '@/actions/mailing/sendProfileStatusEmail'
import {
  deleteRejectingReason,
  saveRejectingReason,
} from '@/backend/profile/rejection.service'
import { requireUserRoles } from '@/utils/auths'
import { Role } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const profileId = params.id

  if (!requireUserRoles([Role.MODERATOR])) {
    return new NextResponse(null, { status: 401 })
  }

  try {
    const rejectData = await request.json()
    const createdReason = await saveRejectingReason(
      profileId,
      rejectData.reason,
    )
    try {
      await sendProfileRejectedEmail(rejectData.email, rejectData.reason)
    } catch (error) {
      await deleteRejectingReason(createdReason.id)
      return new NextResponse(JSON.stringify(error))
    }

    return NextResponse.json({
      message: 'Success',
      createdReason,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
