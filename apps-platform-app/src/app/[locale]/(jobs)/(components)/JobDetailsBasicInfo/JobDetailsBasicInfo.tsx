import React from 'react'
import styles from './JobDetailsBasicInfo.module.scss'
import AvatarsDisplay from '../AvatarsDisplay/AvatarsDisplay'

const JobDetailsBasicInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        {/* Existing content of JobDetailsBasicInfo */}
        <h1>Job Title</h1>
        <p>Job description and other details...</p>
      </div>
      <div className={styles.avatars}>
        <AvatarsDisplay />
      </div>
    </div>
  )
}

export default JobDetailsBasicInfo 