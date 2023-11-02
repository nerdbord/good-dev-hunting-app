'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type ModalContextType = {
  isModalVisible: boolean
  showModal: (state: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [isModalVisible, showModal] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        showModal,
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
