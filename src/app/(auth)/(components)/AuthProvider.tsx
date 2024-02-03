'use client'
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

interface AuthProviderProps {
  children: ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}

export default AuthProvider
