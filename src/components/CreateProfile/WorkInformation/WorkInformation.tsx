'use client'
import React from 'react'
import styles from './WorkInformations.module.scss'

const WorkInformation = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div>Personal Information</div>
        <div className={styles.personalInfo}>
          Share personal information to let the recruiters get to know you.{' '}
        </div>
      </div>
      <div className={styles.right}></div>
    </div>
  )
}

export default WorkInformation
