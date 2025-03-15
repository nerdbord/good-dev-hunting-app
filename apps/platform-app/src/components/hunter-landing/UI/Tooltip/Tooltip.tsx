'use client'
import PointingIcon from '@/components/icons/PointingIcon'
import type{ ReactNode } from 'react'
import styles from './Tooltip.module.scss'

export interface TooltipProps {
  isMobile: boolean
  children: ReactNode
  className?: string
}

export const Tooltip = ({ isMobile, children, className }: TooltipProps) => {
  return (
    <div
      className={`${styles.tooltipWrapper} ${
        isMobile ? styles.mobileTooltip : ''
      } ${className || ''}`}
    >
      <div className={styles.tooltipContent}>{children}</div>
      <div className={styles.pointerContainer}>
        <PointingIcon className={styles.pointer} />
      </div>
    </div>
  )
} 