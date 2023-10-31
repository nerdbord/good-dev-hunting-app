import { saveRejectingReason } from '@/backend/profile/rejection.service'
import { findUserByEmail } from '@/backend/user/user.service'
import { authOptions } from '@/lib/auth'
import { Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const profileId = params.id

  const session = await getServerSession(authOptions)
  const user = session && (await findUserByEmail(session.user.email))

  if (!user || !user?.roles.includes(Role.MODERATOR)) {
    return new NextResponse(null, { status: 401 })
  }

  try {
    const rejectingReasonText = await request.json()
    const createdReason = await saveRejectingReason(
      profileId,
      rejectingReasonText.reason,
    )

    return NextResponse.json({
      message: 'Success',
      createdReason,
    })
  } catch (error) {
    return new NextResponse(JSON.stringify(error))
  }
}
