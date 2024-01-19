import React, { PropsWithChildren } from 'react'
import styles from './LandingContainer.module.scss'

export const LandingContainer = (props: PropsWithChildren<object>) => (
  <div className={styles.container}>{props.children}</div>
)
