'use client'
import React from 'react'
import styles from './page.module.scss'
import Filters from '@/components/Filters/Filters'


const Home: React.FC = () => {

  return (
    <main className={styles.container}>
      <Filters />
    </main>
  )
}

export default Home
