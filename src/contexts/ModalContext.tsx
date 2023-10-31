'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type ModalContextType = {
  profileId: string
  setProfileId: (id: string) => void
  showRejectModal: boolean
  setShowRejectModal: (state: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [profileId, setProfileId] = useState('')

  return (
    <ModalContext.Provider
      value={{
        profileId,
        setProfileId,
        showRejectModal,
        setShowRejectModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export function useModal(): ModalContextType {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}
