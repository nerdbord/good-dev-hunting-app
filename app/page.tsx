import React from 'react'
import styles from './page.module.scss'
import Filters from '@/components/Filters/Filters'
import DefaultHeader from '@/components/DefaultHeader/DefaultHeader'

const Home: React.FC = () => {
  return (
    <div>
      <DefaultHeader />
      <div className={styles.container}>
        <Filters />
        body
      </div>
    </div>
  )
}

export default Home
