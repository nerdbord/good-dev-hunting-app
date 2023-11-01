'use client'
import React, { PropsWithChildren } from 'react'
import combineClasses from '@/utils/combineClasses'

import styles from './Modal.module.scss'
import { IBM_Plex_Sans } from 'next/font/google'
import { createPortal } from 'react-dom'

const ibm = IBM_Plex_Sans({ subsets: ['latin'], weight: '500' })

export default function Modal({ children }: PropsWithChildren) {
  const portal = document.getElementById('portal') as HTMLElement

  return (
    <>
      {createPortal(
        <div className={combineClasses([styles.overlay, ibm.className])}>
          <div className={styles.modalWrapper}>{children}</div>
        </div>,
        portal,
      )}
    </>
  )
}
