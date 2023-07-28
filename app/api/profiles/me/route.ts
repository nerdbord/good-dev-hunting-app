import { getProfileByUserId } from '@/backend/profile/profile.service'
import { NextResponse } from 'next/server'
import { authorizeUser } from '@/lib/auth'

export async function GET(req) {
  try {
    console.log('req.headers', req.headers)

    // 3. Sprawdzić, czy to wystarczy, żeby zwrócić usera i żeby ta metoda zadziałała
    const user = await authorizeUser()

    // 4. Jeżeli działa to będzie działać wszystko - jak nie zadziała to musimy odpakować ten token samodzielnie
    // i wyciągnąć z niego usera

    const userProfile = await getProfileByUserId(user.id)

    return NextResponse.json({
      message: 'Success',
      profile: userProfile,
    })
  } catch (error) {
    return new Response(`${error}`, { status: 500 })
  }
}
