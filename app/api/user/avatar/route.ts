import { NextRequest, NextResponse } from 'next/server'
import { findUserByEmail, updateUserAvatar } from '@/backend/user/user.service'
import { authorizeUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
export async function PUT(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await authorizeUser()
    const requestData = await request.json()
    const { avatarUrl } = requestData

    if (!avatarUrl) {
      return new NextResponse('Error: Invalid avatarUrl', { status: 400 })
    }

    const updatedUser = await updateUserAvatar(email, avatarUrl)

    return NextResponse.json({
      message: 'Success',
      updatedUser,
    })
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 })
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { email } = await authorizeUser()
    const user = await findUserByEmail(email)

    if (!user) {
      return new NextResponse('User not found', { status: 404 })
    }
    const path = request.nextUrl.pathname
    revalidatePath(path)
    return new NextResponse(
      JSON.stringify({
        avatarUrl: user.avatarUrl,
      }),
      { status: 200 },
    )
  } catch (error) {
    return new NextResponse(`${error}`, { status: 500 })
  }
}
