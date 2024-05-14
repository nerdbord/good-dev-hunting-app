'use client'
import { type ProfileModel } from '@/app/[locale]/(profile)/_models/profile.model'
import { createContext, useContext, type PropsWithChildren } from 'react'

interface ProfileContextProps {
  profile: ProfileModel | null
}

export const ProfileContext = createContext<
  | {
      profile: ProfileModel | null
    }
  | undefined
>(undefined)

export const ProfileProvider = ({
  children,
  profile,
}: PropsWithChildren<ProfileContextProps>) => {
  return (
    <ProfileContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  )
}

// Custom hook to use the ProfilesContext
export const useProfileModel = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider')
  }
  return context
}
