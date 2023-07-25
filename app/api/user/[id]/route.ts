import { NextResponse } from 'next/server'
import { authorizeUser } from '@/lib/auth'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import { getUserById } from '@/backend/user/user.service'

export async function GET(request: Request, params: Params) {
  try {
    await authorizeUser()

    const {
      params: { id },
    } = params

    const serializedUser = await getUserById(id)

    return NextResponse.json({
      message: 'Success',
      data: serializedUser,
    })
  } catch (error) {
    return new NextResponse('Something Went Wrong')
  }
}
