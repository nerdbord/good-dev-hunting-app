import React from 'react'
import MyProfileHeader from '@/components/Headers/MyProfileHeader/MyProfileHeader'

const ProfileLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div>
      {/* @ts-expect-error Server Component */}
      <MyProfileHeader />
      {children}
    </div>
  )
}

export default ProfileLayout
