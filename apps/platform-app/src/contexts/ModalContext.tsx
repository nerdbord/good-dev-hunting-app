'use client'

import Modal from '@/components/Modal/Modal'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

export type ModalContextType = {
  showModal: (element: React.ReactNode) => void
  modalContent: React.ReactNode | null
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)

  const showModal = (element: React.ReactNode) => {
    setModalContent(element)
  }

  const closeModal = () => {
    setModalContent(null)
  }

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        showModal,
        closeModal,
      }}
    >
      <Modal />
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
