'use client'
import { createContext, useState, useContext, PropsWithChildren } from 'react'

export enum ToastStatus {
  SUCCESS,
  INVALID,
  HIDDEN,
}

export type ToastType = PropsWithChildren & {
  message: string
  toastStatus: ToastStatus
  setToast: (toastStatus: ToastStatus, message: string) => void
}

export const ToastContext = createContext<ToastType | null>(null)

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [message, setMessage] = useState('')
  const [toastStatus, setToastStatus] = useState<ToastStatus>(
    ToastStatus.HIDDEN,
  )

  const setToast = (tStatus: ToastStatus, tMessage: string) => {
    setToastStatus(tStatus)
    setMessage(tMessage)
  }

  return (
    <ToastContext.Provider
      value={{
        message,
        toastStatus,
        setToast,
      }}
    >
      {children}
    </ToastContext.Provider>
  )
}

export function useToast(): ToastType {
  const context = useContext(ToastContext)
  if (!context)
    throw new Error('useToast must be used within a ToastContectProvider')
  return context
}
