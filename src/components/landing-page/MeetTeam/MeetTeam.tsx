import React from 'react'
import styles from './MeetTeam.module.scss'
import VerticalCard from '@/components/VerticalCard/VerticalCard'

const MeetTeam = () => {
  return (
    <section id="MeetTeam" className={styles.wrapper}>
      <div className={styles.titleBox}>
        <p className={styles.sectionName}>WORKING AS A TEAM</p>
        <h2 className={styles.title}>Meet our team</h2>
        <h5 className={styles.subtitle}>Meet passionates behind the scene</h5>
      </div>
      <div className={styles.sliderWrapper}>
        <div className={styles.cardsBox}>
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
          <VerticalCard />
        </div>
      </div>
    </section>
  )
}

export default MeetTeam
