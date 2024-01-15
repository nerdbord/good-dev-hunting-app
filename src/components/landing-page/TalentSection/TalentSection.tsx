import React from 'react'
import styles from './TalentSection.module.scss'

const TalentSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
    </section>
  )
}

export default TalentSection
