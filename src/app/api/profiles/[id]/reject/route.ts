import { sendProfileRejectedEmail } from '@/backend/mailing/mailing.service'
import { getProfileById } from '@/backend/profile/profile.service'
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
    const { reason } = await request.json()
    const profile = await getProfileById(profileId)
    if (!profile) {
      throw new Error('Rejection failed, profile not found.')
    }
    const createdReason = await saveRejectingReason(profileId, reason)
    try {
      await sendProfileRejectedEmail(profile?.userEmail, reason)
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
