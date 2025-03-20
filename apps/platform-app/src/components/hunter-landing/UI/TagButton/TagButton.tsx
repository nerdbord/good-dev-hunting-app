import type { ReactNode } from 'react'
import styles from './TagButton.module.scss'

export interface TagButtonProps {
  tag: string
  isHighlighted?: boolean
  isSelected?: boolean
  onClick: (tag: string) => void
  style?: React.CSSProperties
  children?: ReactNode
}

export const TagButton = ({
  tag,
  isHighlighted = false,
  isSelected = false,
  onClick,
  style,
  children,
}: TagButtonProps) => {
  return (
    <button
      className={`${styles.tag} ${isHighlighted ? styles.highlighted : ''} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={() => onClick(tag)}
      role="listitem"
      style={style}
    >
      {tag}
      {children}
    </button>
  )
}
