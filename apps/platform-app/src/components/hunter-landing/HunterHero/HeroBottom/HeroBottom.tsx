'use client'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useCallback, useMemo, useState } from 'react'
import { TagTooltip } from '../TagTooltip/TagTooltip'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'
import { TechIcon } from '../../UI/TechIcon/TechIcon'
import { TagsRow } from '../../UI/TagsRow/TagsRow'
import { useTagsAnimation } from '../../hooks/useTagsAnimation'
import { useResponsive } from '../../hooks/useResponsive'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const { isMobile } = useResponsive()
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState('')
  
  // Define tag keys and translations
  const tagKeys = useMemo(() => [
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
  ], []);

  const tags = useMemo(() => tagKeys.map((key) => t(key)), [t, tagKeys])
  const tagsAnimate = useMemo(() => tagKeys.map((key) => t(`animate_${key}`)), [t, tagKeys])

  // Memoize the onTagChange callback to prevent unnecessary re-renders
  const handleTagChange = useCallback((tag: string) => {
    setCurrentAnimatedTag(tag)
  }, [])

  // Use custom hook for tag animations and selection
  const {
    selectedTag,
    tagMapping,
    handleTagClick,
    handleTextareaEmpty,
    getRows,
  } = useTagsAnimation({ tagKeys, tags, tagsAnimate })

  // Memoize the rows calculation to prevent unnecessary recalculations
  const rows = useMemo(() => getRows(isMobile), [getRows, isMobile])

  const mockText = useMemo(() => 
    'Szukam rozwiązania w postaci prywatnego asystenta AI do wsparcia mojej pracy. Potrzebuję systemu, który:\nAutomatycznie zarządza kalendarzem i spotkaniami\nPrzetwarza i kategoryzuje emaile\nPrzygotowuje wstępne odpowiedzi na wiadomości\nPrzypomina o ważnych zadaniach i deadlinach',
  []);

  return (
    <div className={styles.bottomSection}>
      <div className={styles.backgroundIcons}>
        <TechIcon 
          src="/LandingHunter/react-svg.svg" 
          alt="React" 
          className={styles.reactIcon} 
        />
        <TechIcon 
          src="/LandingHunter/python-svg.svg" 
          alt="Python" 
          className={styles.pythonIcon} 
        />
        <TechIcon 
          src="/LandingHunter/java-svg.svg" 
          alt="Java" 
          className={styles.javaIcon} 
        />
      </div>
      
      <TextareaHero
        tagsAnimate={tagsAnimate}
        onTagChange={handleTagChange}
        selectedTag={selectedTag}
        mockText={mockText}
        onEmpty={handleTextareaEmpty}
      />

      <div className={styles.buttonSection}>
        <Button variant="primary">{t('button')}</Button>
      </div>

      <div className={styles.tagsSection}>
        {rows.map((rowTags, rowIndex) => (
          <TagsRow
            key={`row-${rowIndex}`}
            tags={rowTags}
            rowIndex={rowIndex}
            isMobile={isMobile}
            isReversed={rowIndex === 1 && isMobile}
            currentAnimatedTag={currentAnimatedTag}
            selectedTag={selectedTag}
            tagMapping={tagMapping}
            onTagClick={handleTagClick}
          >
            {/* Add tooltip to the first row on desktop, second row on mobile */}
            {((!isMobile && rowIndex === 0) || (isMobile && rowIndex === 1)) && (
              <div className={styles.tooltipContainer}>
                <TagTooltip isMobile={isMobile} />
              </div>
            )}
          </TagsRow>
        ))}
      </div>
    </div>
  )
}
