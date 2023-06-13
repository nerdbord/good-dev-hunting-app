'use client'
import styles from './Filters.module.css'
import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { FilterButton } from 'app/FilterButton/FilterButton'

const Filters = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.features}>
        <FilterButton text="Technology" />
        <FilterButton text="Seniority" />
        <FilterButton text="Availability" />
        <FilterButton text="Location" />
      </div>
      <div className={styles.devType}>
        <button className={styles.devTypeBtn + ' ' + styles.frontend}>
          Frontend
        </button>
        <button className={styles.devTypeBtn + ' ' + styles.backend}>
          Backend
        </button>
        <button className={styles.devTypeBtn + ' ' + styles.fullstack}>
          Fullstack
        </button>
      </div>
    </div>
  )
}

export default Filters
