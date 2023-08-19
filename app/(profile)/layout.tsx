import React from 'react'
import DefaultHeader from '@/components/Headers/DefaultHeader/DefaultHeader'

const ProfileLayout = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <div>
      <DefaultHeader />
      {children}
    </div>
  )
}

export default ProfileLayout
