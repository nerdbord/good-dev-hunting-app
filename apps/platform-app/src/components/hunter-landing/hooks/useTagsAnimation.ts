import { useCallback, useMemo, useState } from 'react'

interface UseTagsAnimationProps {
  tagKeys: string[]
  tags: string[]
  tagsAnimate: string[]
}

interface UseTagsAnimationReturn {
  selectedTag: string | null
  tagMapping: { [key: string]: string }
  handleTagClick: (tag: string) => void
  handleTextareaEmpty: () => void
  getRows: (isMobile: boolean) => string[][]
  currentText: string
  setCurrentText: (text: string) => void
}

export const useTagsAnimation = ({
  tagKeys,
  tags,
  tagsAnimate,
}: UseTagsAnimationProps): UseTagsAnimationReturn => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [currentText, setCurrentText] = useState<string>('')

  // Create a mapping between animated tags and static tags
  const tagMapping = useMemo(() => {
    try {
      const mapping: { [key: string]: string } = {}

      if (!tagKeys || !tags || !tagsAnimate) {
        return mapping
      }

      tagKeys.forEach((key, index) => {
        if (index < tagsAnimate.length && index < tags.length) {
          mapping[tagsAnimate[index]] = tags[index]
        }
      })
      return mapping
    } catch (error) {
      console.error('Error creating tag mapping:', error)
      return {}
    }
  }, [tagKeys, tags, tagsAnimate])

  // Handle tag click
  const handleTagClick = useCallback((tag: string) => {
    if (tag) {
      setSelectedTag(tag)
    }
  }, [])

  // Handle textarea empty
  const handleTextareaEmpty = useCallback(() => {
    setSelectedTag(null)
    setCurrentText('')
  }, [])

  // Create rows based on device type
  const getRows = useCallback(
    (isMobile: boolean) => {
      try {
        if (!tags || !Array.isArray(tags) || tags.length === 0) {
          return []
        }

        if (isMobile) {
          // For mobile, create a continuous loop pattern
          const mobileTagsCount = Math.min(8, tags.length) // Total tags to show in mobile view
          const firstRow = tags.slice(0, Math.min(4, tags.length))
          const secondRow =
            tags.slice(4, mobileTagsCount).length > 0
              ? [...tags.slice(4, mobileTagsCount)].reverse() // Create new array before reversing
              : []

          return [firstRow, secondRow].filter((row) => row.length > 0)
        }

        // For desktop, show all tags in 4 rows
        return [
          tags.slice(0, Math.min(4, tags.length)), // First row: up to 4 tags
          tags.slice(4, Math.min(8, tags.length)), // Second row: up to 4 tags
          tags.slice(8, Math.min(11, tags.length)), // Third row: up to 3 tags
          tags.slice(11, Math.min(13, tags.length)), // Fourth row: up to 2 tags
        ].filter((row) => row.length > 0) // Remove empty rows
      } catch (error) {
        console.error('Error generating rows:', error)
        return []
      }
    },
    [tags],
  )

  return {
    selectedTag,
    tagMapping,
    handleTagClick,
    handleTextareaEmpty,
    getRows,
    currentText,
    setCurrentText,
  }
}
