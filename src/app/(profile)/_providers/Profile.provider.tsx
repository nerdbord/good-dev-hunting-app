'use client'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import { createContext, useContext, type PropsWithChildren } from 'react'

// Define the context
interface ProfilesContextProps {
  profile: ProfileModel
}

export const ProfileContext = createContext<ProfilesContextProps | undefined>(
  undefined,
)

// Define the provider
export const ProfileProvider = ({
  children,
  profile,
}: PropsWithChildren<ProfilesContextProps>) => {
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
    throw new Error('useProfile must be used within a ProfilesProvider')
  }
  return context
}
