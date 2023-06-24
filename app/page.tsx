'use client'
import React from 'react'
import styles from './page.module.scss'
import Filters from '@/components/Filters/Filters'
import { useSession } from 'next-auth/react'

const Home: React.FC = () => {
  const session = useSession()
  console.log(session)
  return (
    <main className={styles.container}>
      <Filters />
    </main>
  )
}

export default Home
