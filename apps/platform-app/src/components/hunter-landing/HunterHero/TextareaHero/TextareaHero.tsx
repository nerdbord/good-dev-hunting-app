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

  useEffect(() => {
    if (onTextChange) {
      onTextChange(text)
    }
  }, [text, onTextChange])

  useEffect(() => {
    if (selectedTag && mockText) {
      setText(mockText)
      if (onTextChange) {
        onTextChange(mockText)
      }
    }
  }, [selectedTag, mockText, setText, onTextChange])

  const adjustHeight = useCallback(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = '121px'
      const scrollHeight = textarea.scrollHeight
      textarea.style.height = scrollHeight + 'px'
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value

    if (newValue === '') {
      setText('')
      setShowPlaceholder(true)
      onEmpty()
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

  useEffect(() => {
    if (selectedTag) {
      setTimeout(adjustHeight, 0)
    }
  }, [selectedTag, adjustHeight])

  return (
    <div className={styles.textareaWrapper}>
      <label htmlFor="searchTextarea" className={styles.visuallyHidden}>
        Opisz swoje zlecenie
      </label>
      {showPlaceholder && !text && (
        <div className={styles.overlayText} aria-hidden="true">
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
        id="searchTextarea"
        ref={textareaRef}
        className={styles.searchTextarea}
        value={selectedTag ? text : text ? `${staticPrefix}${text}` : ''}
        onChange={handleChange}
      />
    </div>
  )
}
