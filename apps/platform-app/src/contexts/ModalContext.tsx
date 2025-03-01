'use client'
import Modal from '@/components/Modal/Modal'
import {
  createContext,
  useContext,
  useState,
  type PropsWithChildren,
} from 'react'

export type ModalVariant = 'default' | 'narrow' | 'red'

export type ModalContextType = {
  // Passing variant is optional; if not provided, 'default' is used
  showModal: (element: React.ReactNode, variant?: ModalVariant) => void
  modalContent: React.ReactNode | null
  variant: ModalVariant
  closeModal: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function ModalProvider({ children }: PropsWithChildren) {
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(null)
  const [variant, setVariant] = useState<ModalVariant>('default')

  const showModal = (
    element: React.ReactNode,
    variant: ModalVariant = 'default',
  ) => {
    setModalContent(element)
    setVariant(variant)
  }

  const closeModal = () => {
    setModalContent(null)
    setVariant('default')
  }

  return (
    <ModalContext.Provider
      value={{
        modalContent,
        showModal,
        variant,
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
