'use client'
import { TooltipText } from '../TooltipText/TooltipText'
import PointingIcon from '@/components/icons/PointingIcon'
import styles from './TagTooltip.module.scss'

export const TagTooltip = () => {
  return (
    <div className={styles.tooltipWrapper}>
      <div className={styles.tooltipContent}>
        <TooltipText />
      </div>
      <div className={styles.pointerContainer}>
        <PointingIcon className={styles.pointer} />
      </div>
    </div>
  )
} 