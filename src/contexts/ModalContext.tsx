'use client'

import { PropsWithChildren, createContext, useContext, useState } from 'react'

export type ModalContextType = {
  isModalVisible: boolean
  showModal: (element: React.ReactNode) => void
  modalContent: React.ReactNode | null
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const showModal = (element: React.ReactNode) => {
    setModalContent(element)
    setIsModalVisible(true)
  }

  const closeModal = () => {
    setIsModalVisible(false)
  }

  return (
    <ModalContext.Provider
      value={{
        isModalVisible,
        modalContent,
        showModal,
        closeModal,
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
