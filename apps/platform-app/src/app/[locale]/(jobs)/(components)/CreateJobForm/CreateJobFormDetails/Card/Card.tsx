import { type PropsWithChildren } from 'react'
import styles from './Card.module.scss'

export const Card = (props: PropsWithChildren<object>) => (
  <div className={styles.container}>{props.children}</div>
)
