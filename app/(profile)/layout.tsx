import React from 'react'
import MyProfileHeader from '@/components/Headers/MyProfileHeader/MyProfileHeader'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const ProfileLayout = async ({
  children,
}: {
  children: React.ReactNode
}): Promise<JSX.Element> => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      <MyProfileHeader session={session} />
      {children}
    </div>
  )
}

export default ProfileLayout
