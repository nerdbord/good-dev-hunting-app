import React, { FC } from 'react'
import style from './Step.module.scss'

interface StepProps {
  title: string
  description1: string
  description2: string
}

const Step: FC<StepProps> = ({ title, description1, description2 }) => {
  return (
    <div className={style.stepBox}>
      <span className={style.title}>{title}</span>
      <div className={style.descr}>
        <span>{description1}</span>
        <br />
        <span>{description2}</span>
      </div>
    </div>
  )
}

export default Step
