import React from 'react'
import MyProfileHeader from '@/components/Headers/MyProfileHeader/MyProfileHeader'

const ProfileLayout = async ({
  children,
}: {
  children: React.ReactNode
}): Promise<JSX.Element> => {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <MyProfileHeader />
      {children}
    </div>
  )
}

export default ProfileLayout
