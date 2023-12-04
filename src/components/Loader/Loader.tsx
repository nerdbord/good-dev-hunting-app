import React from 'react'
import styles from './Loader.module.scss'

const Loader = () => {
  return (
    <p className={styles.loading}>
      Fetching that data for you
      <span className={styles.dot1}>.</span>
      <span className={styles.dot2}>.</span>
      <span className={styles.dot3}>.</span>
    </p>
  )
}

export default Loader
