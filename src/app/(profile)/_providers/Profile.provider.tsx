'use client'
import { findProfileByUserId } from '@/app/(profile)/_actions/queries/findProfileByUserId'
import { type ProfileModel } from '@/app/(profile)/_models/profile.model'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react'

// Define the context
interface ProfileContextProps {
  userId: string
}

export const ProfileContext = createContext<
  | {
      profile: ProfileModel | null
    }
  | undefined
>(undefined)

// Define the provider
export const ProfileProvider = ({
  children,
  userId,
}: PropsWithChildren<ProfileContextProps>) => {
  const [profile, setProfile] = useState<ProfileModel | null>(null)

  useEffect(() => {
    // Fetch the profile
    const fetchProfile = async () => {
      const fetchedProfile = await findProfileByUserId(userId)
      fetchedProfile && setProfile(fetchedProfile)
    }
    fetchProfile()
  }, [])
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
