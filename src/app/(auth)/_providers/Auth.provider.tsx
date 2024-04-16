'use client'
import { type UserModel } from '@/app/(auth)/_models/User.model'
import { SessionProvider } from 'next-auth/react'
import React, { createContext, type ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
  initialUser: UserModel | null
}

export const UserContext = createContext<
  | {
      user: UserModel | null
    }
  | undefined
>(undefined)

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  initialUser,
}) => {
  return (
    <UserContext.Provider value={{ user: initialUser ? initialUser : null }}>
      <SessionProvider>{children}</SessionProvider>
    </UserContext.Provider>
  )
}

export const useAuth = () => {
  const context = React.useContext(UserContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a UserProvider')
  }
  return context
}

export default AuthProvider
