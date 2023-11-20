'use client'
import Toast from '@/components/Toast/Toast'
import { createContext, useState, useContext, PropsWithChildren } from 'react'

import styles from '@/components/Toast/toast.module.scss'
import Portal from '@/components/Portal/Portal'

export enum ToastStatus {
  SUCCESS,
  INVALID,
  HIDDEN,
}

export type ToastType = {
  id: number
  message: string
  toastStatus: ToastStatus
  onRemove: () => void
}

export type ToastProviderType = PropsWithChildren & {
  removeToast: (id: number) => void
  addToast: (message: string, toastStatus: ToastStatus) => void
}

export const ToastContext = createContext<ToastProviderType | null>(null)

export function ToastContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [toasts, setToasts] = useState<Omit<ToastType, 'onRemove'>[]>([])

  const removeToast = (id: number) => {
    setToasts((queue) => [...queue.filter((toast) => toast.id !== id)])
  }

  const addToast = (message: string, toastStatus: ToastStatus) => {
    const newToast = {
      message,
      toastStatus,
      id: Date.now(),
    }
    setToasts((queue) => [...queue, newToast])
  }

  return (
    <ToastContext.Provider
      value={{
        removeToast,
        addToast,
      }}
    >
      {children}
      <Portal selector="#toasts">
        <div className={styles.toastWrapper}>
          {toasts.length > 0 &&
            toasts.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                toastStatus={toast.toastStatus}
                onRemove={() => removeToast(toast.id)}
              />
            ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  )
}

export function useToast(): ToastProviderType {
  const context = useContext(ToastContext)
  if (!context)
    throw new Error('useToast must be used within a ToastContectProvider')
  return context
}
