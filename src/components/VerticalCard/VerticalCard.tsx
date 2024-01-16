import React from 'react'
import styles from './VerticalCard.module.scss'
import Image from 'next/image'
import ProfilePicture from '@/assets/images/ProfilePicture.png'

const VerticalCard = () => {
  return (
    <div className={styles.card}>
      <Image
        width={120}
        height={120}
        src={ProfilePicture}
        alt="Profile Picture"
        className={styles.avatar}
      />
      <div className={styles.person}>
        <h4 className={styles.name}>Karolina Morwińska</h4>
        <div className={styles.position}>Senior Fullstack Developer</div>
        <div className={styles.location}>Poland, Warsaw / Remote</div>
      </div>
      <div className={styles.techStack}>
        <p className={styles.tech}>Javascript</p>
        <p className={styles.tech}>React.js</p>
        <p className={styles.tech}>Vue.js</p>
        <p className={styles.tech}>+5 more</p>
      </div>
      <div className={styles.availability}>
        <div className={styles.dot}></div>
        Available for full-time
      </div>
    </div>
  )
}

export default VerticalCard
