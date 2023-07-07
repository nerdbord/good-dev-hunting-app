import React, { PropsWithChildren } from 'react'
import styles from './Container.module.scss'

type ContainerProps = PropsWithChildren<object>

export const Container = (props: ContainerProps) => (
  <div className={styles.container}>{props.children}</div>
)
