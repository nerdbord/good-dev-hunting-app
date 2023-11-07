'use client'
import React, { PropsWithChildren } from 'react'
import { useModal } from '@/contexts/ModalContext'

import styles from './Modal.module.scss'
import Portal from '../Portal/Portal'

export default function Modal({ children }: PropsWithChildren) {
  const { isModalVisible, modalContent } = useModal()

  if (!isModalVisible) return null
  return (
    <Portal selector="#portal">
      <div className={styles.overlay}>
        <div className={styles.modalWrapper}>
          {!!modalContent && modalContent}
          {children}
        </div>
      </div>
    </Portal>
  )
}
