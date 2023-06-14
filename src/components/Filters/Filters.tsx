'use client'
import styles from './Filters.module.scss'
import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { FilterButton } from '@/components/FilterButton/FilterButton'

const Filters = () => {
  const technologyList = [
    'Javascript',
    'Python',
    'Node.js',
    'React.js',
    'Vue.js',
    'Angular',
    'MongoDB',
  ]
  const seniorityList = ['Intern', 'Junior', 'Mid', 'Senior', 'Lead / Expert']
  const availabilityList = ['Full-time', 'Part-time', 'Contract']
  const locationsList = ['Poland', 'Europe', 'Other']

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
