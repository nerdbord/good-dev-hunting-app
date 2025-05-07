'use client'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef } from 'react'
import { useTextareaAnimation } from '../../hooks/useTextareaAnimation'
import styles from './TextareaHero.module.scss'

type TextareaHeroProps = {
  tagsAnimate: string[]
  onTagChange: (tag: string) => void
  selectedTag: string | null
  mockText: string
  onEmpty: () => void
  onTextChange?: (text: string) => void
}

export const TextareaHero = ({
  tagsAnimate,
  onTagChange,
  selectedTag,
  mockText,
  onEmpty,
  onTextChange,
}: TextareaHeroProps) => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const staticPrefix = t('textareaLabel')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Use custom hook for textarea animation
  const {
    text,
    setText,
    currentTag,
    isAnimating,
    showPlaceholder,
    setShowPlaceholder,
  } = useTextareaAnimation({
    tagsAnimate,
    onTagChange,
    selectedTag,
    mockText,
  })

  // Sync text with parent component
  useEffect(() => {
    // When text changes, notify parent component
    if (onTextChange) {
      onTextChange(text)
    }
  }, [text, onTextChange])

  // When selectedTag changes and there's a mockText, update both
  useEffect(() => {
    if (selectedTag && mockText) {
      setText(mockText)
      if (onTextChange) {
        onTextChange(mockText)
      }
    }
  }, [selectedTag, mockText, setText, onTextChange])

  // Adjust textarea height based on content
  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '121px'
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = scrollHeight + 'px'
    }
  }, [])

  // Handle text change in textarea
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    // If text is being deleted completely
    if (newValue === '') {
      setText('')
      setShowPlaceholder(true)
      onEmpty() // Notify parent component that textarea is empty
      return
    }

    let actualText = newValue
    if (!selectedTag && newValue.startsWith(staticPrefix)) {
      actualText = newValue.slice(staticPrefix.length)
      setText(actualText)
    } else {
      setText(newValue)
      actualText = newValue
      setShowPlaceholder(false)
    }

    adjustHeight()
  }

  // Adjust height when text changes
  useEffect(() => {
    if (selectedTag) {
      setTimeout(adjustHeight, 0)
    }
  }, [selectedTag, adjustHeight])

  return (
    <div className={styles.textareaWrapper}>
      {showPlaceholder && !text && (
        <div className={styles.overlayText}>
          {staticPrefix}
          <span
            className={`${styles.dynamicText} ${
              isAnimating ? styles.animating : ''
            }`}
          >
            {currentTag}
          </span>
        </div>
      )}
      <textarea
        ref={textareaRef}
        className={styles.searchTextarea}
        value={selectedTag ? text : text ? `${staticPrefix}${text}` : ''}
        onChange={handleChange}
      />
    </div>
  )
}
