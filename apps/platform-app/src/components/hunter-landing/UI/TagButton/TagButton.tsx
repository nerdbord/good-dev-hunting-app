import type { CSSProperties, ReactNode } from 'react'
import styles from './TagButton.module.scss'

export interface TagButtonProps {
  /** Unique identifier or display text for the tag */
  tag: string
  /** Highlight the tag as the current or recommended one */
  isHighlighted?: boolean
  /** Indicate a selected (pressed) state */
  isSelected?: boolean
  /** Click handler receives the tag string */
  onClick: (tag: string) => void
  /** Custom inline styles */
  style?: CSSProperties
  /** Optional icon or additional content */
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
  // Compute ARIA attributes
  const ariaPressed = isSelected ? true : undefined
  const ariaCurrent = isHighlighted ? 'true' : undefined

  return (
    <button
      type="button"
      className={`${styles.tag} ${isHighlighted ? styles.highlighted : ''} ${
        isSelected ? styles.selected : ''
      }`}
      onClick={() => onClick(tag)}
      style={style}
      aria-pressed={ariaPressed}
      aria-current={ariaCurrent}
    >
      <span>{tag}</span>
      {children}
    </button>
  )
}
