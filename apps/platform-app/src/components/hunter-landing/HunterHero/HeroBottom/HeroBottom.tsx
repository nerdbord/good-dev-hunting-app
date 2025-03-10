'use client'
import { Button } from '@gdh/ui-system'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { TagTooltip } from '../TagTooltip/TagTooltip'
import Image from 'next/image'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

  // Create rows based on device type
  const getRows = () => {
    if (isMobile) {
      // For mobile, create a continuous loop pattern
      const mobileTagsCount = 8 // Total tags to show in mobile view
      const firstRow = tags.slice(0, 4)
      const secondRow = [...tags.slice(4, mobileTagsCount)].reverse() // Create new array before reversing
      return [firstRow, secondRow]
    }
    
    // For desktop, show all tags in 4 rows
    return [
      tags.slice(0, 4),  // First row: 4 tags
      tags.slice(4, 8),  // Second row: 4 tags
      tags.slice(8, 11), // Third row: 3 tags
      tags.slice(11, 13) // Fourth row: 2 tags
    ]
  }

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

  const renderRow = (rowTags: string[], style: string, rowIndex: number) => (
    <div 
      key={`row-${rowIndex}`} 
      className={`${style} ${isMobile ? styles.mobileRow : ''} ${isMobile && rowIndex === 1 ? styles.mobileRowReverse : ''}`}
      role="list"
    >
      {rowTags.map((tag, tagIndex) => (
        <button 
          key={`${rowIndex}-${tag}-${tagIndex}`}
          className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
          onClick={() => handleTagClick(tag)}
          role="listitem"
        >
          {tag}
          {rowIndex === 0 && tagIndex === 3 && !isMobile && (
            <TagTooltip isMobile={isMobile} />
          )}
        </button>
      ))}
      {rowIndex === 1 && isMobile && (
        <TagTooltip isMobile={isMobile} />
      )}
    </div>
  )

  const rows = getRows()

  return (
    <div className={styles.bottomSection}>
            <div className={styles.backgroundIcons}>
        <div className={`${styles.icon} ${styles.reactIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/react-svg.svg"
                  alt="React"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.icon} ${styles.pythonIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/python-svg.svg"
                  alt="Python"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.icon} ${styles.javaIcon}`}>
          <div className={styles.gradientOuter}>
            <div className={styles.gradientInner}>
              <div className={styles.backgroundShadow}>
                <Image
                  src="/LandingHunter/java-svg.svg"
                  alt="Java"
                  width={48}
                  height={65}
                  className={styles.techImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
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
        {rows.map((row, index) => renderRow(row, styles.row, index))}
      </div>
    </div>
  )
}
