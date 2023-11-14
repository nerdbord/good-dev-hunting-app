'use client'
import React, { PropsWithChildren } from 'react'
import { useModal } from '@/contexts/ModalContext'

import styles from './Modal.module.scss'
import Portal from '../Portal/Portal'

export default function Modal({ children }: PropsWithChildren) {
  const { modalContent } = useModal()

  if (!modalContent) return null
  return (
    <Portal selector="#portal">
      <div className={styles.overlay}>
        <div className={styles.modalWrapper} data-testid="modal">
          {modalContent}
          {children}
        </div>
      </div>
    </Portal>
  )
}
