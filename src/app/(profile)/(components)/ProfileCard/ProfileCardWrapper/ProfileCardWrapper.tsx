'use client'
import ProfileCard from '@/app/(profile)/(components)/ProfileCard/ProfileCard'
import { ProfileModel } from '@/app/(profile)/types'
import { AppRoutes } from '@/utils/routes'
import { useRouter } from 'next/navigation'

interface ProfileCardWrapperProps {
  profile: ProfileModel
}

export const ProfileCardWrapper = ({ profile }: ProfileCardWrapperProps) => {
  const router = useRouter()

  const handleOpenProfile = () => {
    router.push(`${AppRoutes.profiles}/${profile.githubUsername}`)
  }

  return (
    <div onClick={handleOpenProfile}>
      <ProfileCard data={profile} />
    </div>
  )
}
