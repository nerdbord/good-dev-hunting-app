'use client'
import { Button } from '@gdh/ui-system'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const tagKeys = [
    'privateAIassistant',
    'website',
    'paymentSystemIntegration',
    'onlinePlatformDesign',
    'mobileApplication',
    'dataManagementSystem',
    'databaseMigration',
    'automation',
    'iOSAndroidApplication',
    'automationBot',
    'designSystem',
    'QAtesting',
    'APIintegration'
  ]

  const tags = tagKeys.map(key => t(key))
  const tagsAnimate = tagKeys.map(key => t(`animate_${key}`))

  // Split tags into rows
  const firstRow = tags.slice(0, 4)
  const secondRow = tags.slice(4, 8)
  const thirdRow = tags.slice(8, 11)
  const fourthRow = tags.slice(11, 13)

  const tagMapping: { [key: string]: string } = {}
  tagKeys.forEach(key => {
    const animatedText = t(`animate_${key}`)
    const staticText = t(key)
    tagMapping[animatedText] = staticText
  })

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag)
  }

  const handleTextareaEmpty = () => {
    setSelectedTag(null)
  }

  const mockText = "Szukam rozwiązania w postaci prywatnego asystenta AI do wsparcia mojej pracy. Potrzebuję systemu, który:\nAutomatycznie zarządza kalendarzem i spotkaniami\nPrzetwarza i kategoryzuje emaile\nPrzygotowuje wstępne odpowiedzi na wiadomości\nPrzypomina o ważnych zadaniach i deadlinach"

  const renderRow = (rowTags: string[], style: string) => (
    <div className={style}>
      {rowTags.map((tag, index) => (
        <button 
          key={index} 
          className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )

  return (
    <div className={styles.bottomSection}>
      <TextareaHero 
        tagsAnimate={tagsAnimate} 
        onTagChange={(tag) => setCurrentAnimatedTag(tag)}
        selectedTag={selectedTag}
        mockText={mockText}
        onEmpty={handleTextareaEmpty}
      />

      <div className={styles.buttonSection}>
        <Button variant="primary">{t('button')}</Button>
      </div>

      <div className={styles.tagsSection}>
        {renderRow(firstRow, styles.row)}
        {renderRow(secondRow, styles.row)}
        {renderRow(thirdRow, styles.row)}
        {renderRow(fourthRow, styles.row)}
      </div>
    </div>
  )
}
