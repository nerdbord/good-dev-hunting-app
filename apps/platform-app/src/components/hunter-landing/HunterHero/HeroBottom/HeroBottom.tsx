'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { TagTooltip } from '../TagTooltip/TagTooltip'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState('')
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([])

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
    'APIintegration',
  ]

  const tags = tagKeys.map((key) => t(key))
  const tagsAnimate = tagKeys.map((key) => t(`animate_${key}`))

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
      tags.slice(0, 4), // First row: 4 tags
      tags.slice(4, 8), // Second row: 4 tags
      tags.slice(8, 11), // Third row: 3 tags
      tags.slice(11, 13), // Fourth row: 2 tags
    ]
  }
  
  // Add state to store rows
  const [rows, setRows] = useState(getRows());
  
  useEffect(() => {
    const checkMobile = () => {
      const isMobileNow = window.innerWidth <= 768;
      
      // If viewport size changed between mobile and desktop
      if (isMobileNow !== isMobile) {
        setIsMobile(isMobileNow);
        
        // Reset rows when switching between mobile and desktop
        // This will force a re-render with the correct structure
        if (!isMobileNow) {
          // Small delay to ensure state updates properly
          setTimeout(() => {
            // Force re-render of rows by updating a state
            setRows([...getRows()]);
          }, 100);
        }
      }
    }
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]);
  
  // Update rows when mobile state changes
  useEffect(() => {
    setRows(getRows());
  }, [isMobile]);

  const tagMapping: { [key: string]: string } = {}
  tagKeys.forEach((key) => {
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

  const mockText =
    'Szukam rozwiązania w postaci prywatnego asystenta AI do wsparcia mojej pracy. Potrzebuję systemu, który:\nAutomatycznie zarządza kalendarzem i spotkaniami\nPrzetwarza i kategoryzuje emaile\nPrzygotowuje wstępne odpowiedzi na wiadomości\nPrzypomina o ważnych zadaniach i deadlinach'

  useEffect(() => {
    if (typeof window !== 'undefined' && isMobile) {
      // Delay to ensure DOM is fully rendered
      setTimeout(() => {
        rowRefs.current.forEach((rowRef, index) => {
          if (rowRef) {
            // Set overflow-x to auto for mobile rows
            rowRef.style.overflowX = 'auto'
            // Use standard properties or add as custom properties
            ;(rowRef.style as any).webkitOverflowScrolling = 'touch'
            ;(rowRef.style as any).scrollbarWidth = 'none'
            ;(rowRef.style as any).msOverflowStyle = 'none'

            // Hide scrollbar
            const style = document.createElement('style')
            style.textContent = `
              #row-${index}::-webkit-scrollbar {
                display: none;
              }
            `
            document.head.appendChild(style)

            // Set initial scroll position for second row (if reversed)
            if (index === 1) {
              // For reversed row, start at the end
              rowRef.scrollLeft = rowRef.scrollWidth - rowRef.clientWidth
            }
          }
        })
      }, 100)
    }
  }, [isMobile, rows])

  const renderRow = (rowTags: string[], style: string, rowIndex: number) => {
    // For the second row on mobile, we need to handle the reverse layout differently
    const isSecondRowMobile = rowIndex === 1 && isMobile
    
    return (
      <div 
        id={`row-${rowIndex}`}
        key={`row-${rowIndex}`} 
        className={`${style} ${isMobile ? styles.mobileRow : ''}`}
        ref={(el) => {
          rowRefs.current[rowIndex] = el;
        }}
        role="list"
        style={isSecondRowMobile ? { direction: 'rtl' } : undefined}
      >
        {/* For infinite scroll effect, duplicate tags at beginning and end */}
        {isMobile && (
          <>
            {/* Add last 2 items at the beginning for infinite scroll effect */}
            {rowIndex === 0 && rowTags.slice(-2).map((tag, tagIndex) => (
              <button 
                key={`${rowIndex}-start-${tag}-${tagIndex}`}
                className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
                onClick={() => handleTagClick(tag)}
                role="listitem"
                style={isSecondRowMobile ? { direction: 'ltr' } : undefined}
              >
                {tag}
              </button>
            ))}
            
            {/* For reversed row, add first 2 items at the beginning */}
            {isSecondRowMobile && rowTags.slice(0, 2).map((tag, tagIndex) => (
              <button 
                key={`${rowIndex}-start-${tag}-${tagIndex}`}
                className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
                onClick={() => handleTagClick(tag)}
                role="listitem"
                style={{ direction: 'ltr' }}
              >
                {tag}
              </button>
            ))}
          </>
        )}
        
        {/* Original tags */}
        {rowTags.map((tag, tagIndex) => {
          const isTooltipTag = rowIndex === 0 && tagIndex === 3 && !isMobile;
          
          return (
            <button 
              key={`${rowIndex}-${tag}-${tagIndex}`}
              className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
              onClick={() => handleTagClick(tag)}
              role="listitem"
              style={isSecondRowMobile ? { direction: 'ltr' } : undefined}
            >
              {tag}
              {isTooltipTag && <TagTooltip isMobile={false} />}
            </button>
          );
        })}
        
        {isMobile && (
          <>
            {/* Add first 2 items at the end for infinite scroll effect */}
            {rowIndex === 0 && rowTags.slice(0, 2).map((tag, tagIndex) => (
              <button 
                key={`${rowIndex}-end-${tag}-${tagIndex}`}
                className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
                onClick={() => handleTagClick(tag)}
                role="listitem"
              >
                {tag}
              </button>
            ))}
            
            {/* For reversed row, add last 2 items at the end */}
            {isSecondRowMobile && rowTags.slice(-2).map((tag, tagIndex) => (
              <button 
                key={`${rowIndex}-end-${tag}-${tagIndex}`}
                className={`${styles.tag} ${tagMapping[currentAnimatedTag] === tag ? styles.highlighted : ''} ${selectedTag === tag ? styles.selected : ''}`}
                onClick={() => handleTagClick(tag)}
                role="listitem"
                style={{ direction: 'ltr' }}
              >
                {tag}
              </button>
            ))}
          </>
        )}
        
        {/* Mobile tooltip - positioned outside the scroll container for proper display */}
        {rowIndex === 1 && isMobile && (
          <div className={styles.tooltipContainer}>
            <TagTooltip isMobile={isMobile} />
          </div>
        )}
      </div>
    );
  }

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
