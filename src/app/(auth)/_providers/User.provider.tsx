'use client'
import { type UserModel } from '@/app/(auth)/_models/User.model'
import { createContext, useContext, type PropsWithChildren } from 'react'

// Define the context
interface ProfilesContextProps {
  user: UserModel | null
}

export const UserContext = createContext<ProfilesContextProps | undefined>(
  undefined,
)

// Define the provider
export const UserProvider = ({
  children,
  user,
}: PropsWithChildren<ProfilesContextProps>) => {
  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

// Custom hook to use the ProfilesContext
export const useUserModel = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a ProfilesProvider')
  }
  return context
}
