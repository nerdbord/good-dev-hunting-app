'use client'
import styles from './FilterButton.module.css'
import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export const FilterButton = ({ text }) => {
  const [arrow, setArrow] = useState('IoIosArrowUp')

  const toggleArrow = () => {
    setArrow(arrow === 'IoIosArrowUp' ? 'IoIosArrowDown' : 'IoIosArrowUp')
  }

  return (
    <button onClick={toggleArrow} className={styles.featuresBtn}>
      {text}
      {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </button>
  )
}
