'use client'
import { useProfilesStore } from '@/app/[locale]/(profile)/_providers/profiles-store.provider'
import { useEffect, type PropsWithChildren } from 'react'

type MyProfileLayoutProps = PropsWithChildren & {
  profileId: string
}

export const MyProfileLayout = ({
  children,
  profileId,
}: MyProfileLayoutProps) => {
  const { setProfile, resetProfile } = useProfilesStore((state) => state)

  useEffect(() => {
    setProfile(profileId)

    return () => {
      resetProfile()
    }
  }, [])

  return <main>{children}</main>
}
