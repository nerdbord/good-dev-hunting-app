'use client'
import type { ReactNode } from 'react'
import { memo, useEffect, useRef } from 'react'
import { TagButton } from '../TagButton/TagButton'
import styles from './TagsRow.module.scss'

export interface TagsRowProps {
  tags: string[]
  rowIndex: number
  isMobile: boolean
  isReversed?: boolean
  currentAnimatedTag: string
  selectedTag: string | null
  tagMapping: { [key: string]: string }
  onTagClick: (tag: string) => void
  children?: ReactNode
}

export const TagsRow = memo(
  ({
    tags,
    rowIndex,
    isMobile,
    isReversed = false,
    currentAnimatedTag,
    selectedTag,
    tagMapping,
    onTagClick,
    children,
  }: TagsRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const styleRef = useRef<HTMLStyleElement | null>(null)

    // Skip rendering if no tags
    if (!tags || tags.length === 0) {
      return null
    }

    useEffect(() => {
      // Clean up function to remove any lingering style elements
      return () => {
        if (styleRef.current && document.head.contains(styleRef.current)) {
          document.head.removeChild(styleRef.current)
          styleRef.current = null
        }
      }
    }, [])

    useEffect(() => {
      if (typeof window !== 'undefined' && isMobile && rowRef.current) {
        const rowElement = rowRef.current

        // Set overflow-x to auto for mobile rows
        rowElement.style.overflowX = 'auto'
        // Use standard properties or add as custom properties
        ;(rowElement.style as any).webkitOverflowScrolling = 'touch'
        ;(rowElement.style as any).scrollbarWidth = 'none'
        ;(rowElement.style as any).msOverflowStyle = 'none'

        // Clean up any existing style element
        if (styleRef.current && document.head.contains(styleRef.current)) {
          document.head.removeChild(styleRef.current)
        }

        // Create new style element
        const style = document.createElement('style')
        style.textContent = `
        #row-${rowIndex}::-webkit-scrollbar {
          display: none;
        }
      `
        document.head.appendChild(style)
        styleRef.current = style

        // Set initial scroll position for reversed row
        if (isReversed) {
          // For reversed row, start at the end
          rowElement.scrollLeft =
            rowElement.scrollWidth - rowElement.clientWidth
        }
      }
    }, [isMobile, rowIndex, isReversed])

    // For the second row on mobile, we need to handle the reverse layout differently
    const rowStyle =
      isReversed && isMobile ? { direction: 'rtl' as const } : undefined

    // Prepare duplicate tags for infinite scroll effect on mobile
    const getInfiniteScrollTags = () => {
      if (!isMobile || tags.length <= 1) return tags

      if (isReversed) {
        // For reversed row, add first 2 items at the beginning and last 2 at the end
        const firstItems = tags.length >= 2 ? tags.slice(0, 2) : [...tags]
        const lastItems = tags.length >= 2 ? tags.slice(-2) : [...tags]
        return [...firstItems, ...tags, ...lastItems]
      } else {
        // For normal row, add last 2 items at the beginning and first 2 at the end
        const firstItems = tags.length >= 2 ? tags.slice(0, 2) : [...tags]
        const lastItems = tags.length >= 2 ? tags.slice(-2) : [...tags]
        return [...lastItems, ...tags, ...firstItems]
      }
    }

    const displayTags = isMobile ? getInfiniteScrollTags() : tags

    return (
      <div
        id={`row-${rowIndex}`}
        className={`${styles.row} ${isMobile ? styles.mobileRow : ''}`}
        ref={rowRef}
        role="list"
        style={rowStyle}
      >
        {displayTags.map((tag, tagIndex) => {
          if (!tag) return null

          const itemStyle =
            isReversed && isMobile ? { direction: 'ltr' as const } : undefined
          const isHighlighted = tagMapping[currentAnimatedTag] === tag
          const isSelected = selectedTag === tag

          return (
            <TagButton
              key={`${rowIndex}-${tag}-${tagIndex}`}
              tag={tag}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
              onClick={onTagClick}
              style={itemStyle}
            />
          )
        })}
        {children}
      </div>
    )
  },
)
