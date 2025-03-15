'use client'
import { TooltipText } from '../TooltipText/TooltipText'
import { Tooltip } from '../../UI/Tooltip/Tooltip'

interface TagTooltipProps {
  isMobile: boolean
}

export const TagTooltip = ({ isMobile }: TagTooltipProps) => {
  return (
    <Tooltip isMobile={isMobile}>
      <TooltipText />
    </Tooltip>
  )
} 