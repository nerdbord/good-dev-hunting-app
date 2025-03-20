'use client'
import { Tooltip } from '../../UI/Tooltip/Tooltip'
import { TooltipText } from '../TooltipText/TooltipText'

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
