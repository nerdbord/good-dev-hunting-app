import React from 'react'
import styles from './FAQ.module.scss'

const FAQ = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>FAQ</span>
        <small>Let us know if&nbsp;you&nbsp;have any&nbsp;questions.</small>
      </div>
      <div>accordion</div>
    </section>
  )
}

export default FAQ
