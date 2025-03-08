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

  // Define tag keys for both static and animated tags - order matches translations
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
    'QAtesting',
    'APIintegration'
  ]

  // Create arrays using translations
  const tags = tagKeys.map(key => t(key))
  const tagsAnimate = tagKeys.map(key => t(`animate_${key}`))

  // Create mapping between animated translations and static translations
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
        {tags.map((tag, index) => (
          <button 
            key={index} 
            className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
