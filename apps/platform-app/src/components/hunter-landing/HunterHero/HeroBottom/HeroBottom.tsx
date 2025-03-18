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

  const mockTexts = {
    'privateAIassistant': 'Szukam rozwiązania w postaci prywatnego asystenta AI do wsparcia mojej pracy. Potrzebuję systemu, który:\nAutomatycznie zarządza kalendarzem i spotkaniami\nPrzetwarza i kategoryzuje emaile\nPrzygotowuje wstępne odpowiedzi na wiadomości\nPrzypomina o ważnych zadaniach i deadlinach',
    'website': 'Szukam rozwiązania do stworzenia nowoczesnej strony internetowej dla mojej firmy. Potrzebuję systemu, który:\nZapewnia intuicyjną nawigację i responsywność\nIntegruje się z mediami społecznościowymi\nOferuje system zarządzania treścią\nUmożliwia łatwe dodawanie nowych podstron',
    'onlinePlatformDesign': 'Szukam rozwiązania do zaprojektowania platformy internetowej. Potrzebuję systemu, który:\nOferuje nowoczesny i spójny design\nZapewnia intuicyjne doświadczenie użytkownika\nDostosowuje się do różnych urządzeń\nUmożliwia łatwą personalizację elementów',
    'paymentSystemIntegration': 'Szukam rozwiązania do integracji systemów płatności w moim biznesie. Potrzebuję systemu, który:\nObsługuje różne metody płatności elektronicznych\nAutomatycznie księguje transakcje\nGeneruje raporty finansowe\nZapewnia bezpieczne przetwarzanie danych',
    'mobileApplication': 'Potrzebuję stworzyć nową aplikację mobilną dla mojej firmy. Chciałbym, aby była ona:\natrakcyjna i profesjonalna\nzoptymalizowana pod kątem SEO\nresponsywna i łatwa w użyciu\nzawierała informacje o naszych usługach i produktach',
    'dataManagementSystem': 'Potrzebuję stworzyć nowy system zarządzania danymi dla mojej firmy. Chciałbym, aby był on:\nelastyczny i skalowalny\nzawierał funkcje automatycznego przetwarzania i analizy danych\numożliwiał integrację z innymi systemami',
    'databaseMigration': 'Potrzebuję przeprowadzić migrację mojej bazy danych z jednego systemu na drugi. Chciałbym, aby była ona:\nbezpieczna i sprawna\nzachowana zgodność z poprzednimi danymi\nzminimalizowana przestój',
    'automation': 'Potrzebuję stworzyć automatyzację procesu w mojej firmie. Chciałbym, aby była ona:\nelastyczna i skalowalna\nzawierała funkcje automatycznego przetwarzania danych\numożliwiała integrację z innymi systemami',
    'iOSAndroidApplication': 'Potrzebuję stworzyć nową aplikację mobilną dla iOS i Android. Chciałbym, aby była ona:\natrakcyjna i profesjonalna\nzoptymalizowana pod kątem SEO\nresponsywna i łatwa w użyciu\nzawierała informacje o naszych usługach i produktach',
    'automationBot': 'Potrzebuję stworzyć automatyzację procesu w mojej firmie. Chciałbym, aby była ona:\nelastyczna i skalowalna\nzawierała funkcje automatycznego przetwarzania danych\numożliwiała integrację z innymi systemami',
    'designSystem': 'Potrzebuję stworzyć nowy system designu dla mojej firmy. Chciałbym, aby był on:\nelastyczny i skalowalny\nzawierał funkcje automatycznego przetwarzania i analizy danych\numożliwiał integrację z innymi systemami',
    'QAtesting': 'Potrzebuję stworzyć nowy system QA dla mojej firmy. Chciałbym, aby był on:\nelastyczny i skalowalny\nzawierał funkcje automatycznego przetwarzania i analizy danych\numożliwiał integrację z innymi systemami',
    'APIintegration': 'Potrzebuję stworzyć nowy system API dla mojej firmy. Chciałbym, aby był on:\nelastyczny i skalowalny\nzawierał funkcje automatycznego przetwarzania i analizy danych\numożliwiał integrację z innymi systemami',
  }

  // Get the current mockText based on the selected tag or use default
  const currentMockText = useMemo(() => {
    // Make sure selectedTag is one of the valid keys
    if (selectedTag && tagKeys.includes(selectedTag)) {
      return mockTexts[selectedTag as keyof typeof mockTexts];
    }
    return mockTexts['privateAIassistant'];
  }, [selectedTag, mockTexts, tagKeys]);

  // Create a custom tag click handler that captures the tag key
  const handleTagButtonClick = useCallback((tag: string) => {
    // Find the key for this tag by looking through the tagMapping
    const tagKey = Object.entries(tagMapping).find(([_, value]) => value === tag)?.[0];
    
    // Find the corresponding tagKey from the original tagKeys
    if (tagKey) {
      const keyIndex = tagsAnimate.findIndex(animateTag => animateTag === tagKey);
      if (keyIndex >= 0 && keyIndex < tagKeys.length) {
        // Call the original handleTagClick with the tag value
        handleTagClick(tagKeys[keyIndex]);
      }
    } else {
      // Fallback to original behavior if mapping not found
      handleTagClick(tag);
    }
  }, [tagMapping, tagsAnimate, tagKeys, handleTagClick]);

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
        mockText={currentMockText}
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
            onTagClick={handleTagButtonClick}
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
