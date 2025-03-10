'use client'
import { TooltipText } from '../TooltipText/TooltipText'
import PointingIcon from '@/components/icons/PointingIcon'
import styles from './TagTooltip.module.scss'

interface TagTooltipProps {
  isMobile: boolean;
}

export const TagTooltip = ({ isMobile }: TagTooltipProps) => {
  return (
    <div className={`${styles.tooltipWrapper} ${isMobile ? styles.mobileTooltip : ''}`}>
      <div className={styles.tooltipContent}>
        <TooltipText />
      </div>
      <div className={styles.pointerContainer}>
        <PointingIcon className={styles.pointer} />
      </div>
    </div>
  )
} 