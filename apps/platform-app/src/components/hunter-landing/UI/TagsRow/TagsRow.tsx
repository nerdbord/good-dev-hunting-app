'use client'
import type { ReactNode } from 'react'
import { memo, useEffect, useRef } from 'react'
import { TagButton } from '../TagButton/TagButton'
import styles from './TagsRow.module.scss'

export interface TagsRowProps {
  tags: string[]
  rowIndex: number
  isMobile: boolean
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
    currentAnimatedTag,
    selectedTag,
    tagMapping,
    onTagClick,
    children,
  }: TagsRowProps) => {
    const rowRef = useRef<HTMLDivElement>(null)
    const styleRef = useRef<HTMLStyleElement | null>(null)

    if (!tags || tags.length === 0) return null

    useEffect(() => {
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
        rowElement.style.overflowX = 'auto'
        ;(rowElement.style as any).webkitOverflowScrolling = 'touch'
        ;(rowElement.style as any).scrollbarWidth = 'none'
        ;(rowElement.style as any).msOverflowStyle = 'none'

        if (styleRef.current && document.head.contains(styleRef.current)) {
          document.head.removeChild(styleRef.current)
        }

        const style = document.createElement('style')
        style.textContent = `
          #row-${rowIndex}::-webkit-scrollbar {
            display: none;
          }
        `
        document.head.appendChild(style)
        styleRef.current = style

        // Always scroll to start on mount
        rowElement.scrollLeft = 0
      }
    }, [isMobile, rowIndex])

    const getInfiniteScrollTags = () => {
      if (!isMobile || tags.length <= 1) return tags

      const firstItems = tags.length >= 2 ? tags.slice(0, 2) : [...tags]
      const lastItems = tags.length >= 2 ? tags.slice(-2) : [...tags]
      return [...lastItems, ...tags, ...firstItems]
    }

    const displayTags = isMobile ? getInfiniteScrollTags() : tags

    return (
      <div
        id={`row-${rowIndex}`}
        className={`${styles.row} ${isMobile ? styles.mobileRow : ''}`}
        ref={rowRef}
        role="list"
      >
        {displayTags.map((tag, tagIndex) => {
          if (!tag) return null

          const isHighlighted = tagMapping[currentAnimatedTag] === tag
          const isSelected = selectedTag === tag

          return (
            <TagButton
              key={`${rowIndex}-${tag}-${tagIndex}`}
              tag={tag}
              isHighlighted={isHighlighted}
              isSelected={isSelected}
              onClick={onTagClick}
            />
          )
        })}
        {children}
      </div>
    )
  },
)
