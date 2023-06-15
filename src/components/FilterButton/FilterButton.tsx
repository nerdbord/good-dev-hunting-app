'use client'
import styles from './FilterButton.module.scss'
import React, { useState } from 'react'
import 'material-icons/iconfont/material-icons.css'
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'

export const FilterButton = ({ text }: { text: string }) => {
  const [arrow, setArrow] = useState('IoIosArrowDown')

  const toggleArrow = () => {
    setArrow(arrow === 'IoIosArrowDown' ? 'IoIosArrowUp' : 'IoIosArrowDown')
  }

  return (
    <button onClick={toggleArrow} className={styles.featuresBtn}>
      {text}
      {arrow === 'IoIosArrowUp' ? <IoIosArrowUp /> : <IoIosArrowDown />}
    </button>
  )
}
