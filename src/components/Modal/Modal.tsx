'use client'
import { useModal } from '@/contexts/ModalContext'
import { type PropsWithChildren } from 'react'

import Portal from '../Portal/Portal'
import styles from './Modal.module.scss'

export default function Modal({ children }: PropsWithChildren) {
  const { modalContent } = useModal()

  if (!modalContent) return null
  return (
    <Portal selector="#portal">
      <div className={styles.overlay}>
        <div className={styles.modalWrapper}>
          {modalContent}
          {children}
        </div>
      </div>
    </Portal>
  )
}
