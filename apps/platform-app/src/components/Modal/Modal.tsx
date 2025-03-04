'use client'
import { useModal } from '@/contexts/ModalContext'
import { type PropsWithChildren } from 'react'
import Portal from '../Portal/Portal'
import styles from './Modal.module.scss'

export default function Modal({ children }: PropsWithChildren) {
  const { modalContent, variant } = useModal()

  if (!modalContent) return null

  return (
    <Portal selector="#portal">
      <div className={styles.overlay}>
        <div
          className={`${styles.modalWrapper} ${
            variant === 'narrow' ? styles.wrapperNarrow : ''
          } ${variant === 'red' ? styles.wrapperRed : ''}`}
        >
          {modalContent}
          {children}
        </div>
      </div>
    </Portal>
  )
}
