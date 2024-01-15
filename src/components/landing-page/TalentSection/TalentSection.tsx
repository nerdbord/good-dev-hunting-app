import React from 'react'
import styles from './TalentSection.module.scss'
import FindTalentsBtn from '@/components/FindTalentsBtn/FindTalentsBtn'

const TalentSection = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.heading}>
        <span>Find your next talent</span>
        <small>
          Explore our growing talents community. Contact as many as you want.
        </small>
      </div>
      <FindTalentsBtn variant="primary">Find all talents</FindTalentsBtn>
    </section>
  )
}

export default TalentSection
