import { type ReactNode } from 'react'
import styles from './Box.module.scss'

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <section className={styles.box}>
      <div className={styles.boxContent}>{children}</div>
    </section>
  )
}

export default Box
