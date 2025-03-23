'use client'
import { createJobFromDescriptionAction } from '@/app/[locale]/(jobs)/_actions/mutations/createJob'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { HunterLoader } from '../../HunterLoader/HunterLoader'
import { TagsRow } from '../../UI/TagsRow/TagsRow'
import { TechIcon } from '../../UI/TechIcon/TechIcon'
import { useResponsive } from '../../hooks/useResponsive'
import { useTagsAnimation } from '../../hooks/useTagsAnimation'
import { TagTooltip } from '../TagTooltip/TagTooltip'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const { isMobile } = useResponsive()
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { addToast } = useToast()

  // Define tag keys and translations
  const tagKeys = useMemo(
    () => [
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
    ],
    [],
  )

  const tags = useMemo(() => tagKeys.map((key) => t(key)), [t, tagKeys])
  const tagsAnimate = useMemo(
    () => tagKeys.map((key) => t(`animate_${key}`)),
    [t, tagKeys],
  )

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
    currentText,
    setCurrentText,
  } = useTagsAnimation({ tagKeys, tags, tagsAnimate })

  // Memoize the rows calculation to prevent unnecessary recalculations
  const rows = useMemo(() => getRows(isMobile), [getRows, isMobile])

  // Use translated mock texts from i18n
  const mockTexts = useMemo(() => {
    return {
      privateAIassistant: t('mockText_privateAIassistant'),
      website: t('mockText_website'),
      onlinePlatformDesign: t('mockText_onlinePlatformDesign'),
      paymentSystemIntegration: t('mockText_paymentSystemIntegration'),
      mobileApplication: t('mockText_mobileApplication'),
      dataManagementSystem: t('mockText_dataManagementSystem'),
      databaseMigration: t('mockText_databaseMigration'),
      automation: t('mockText_automation'),
      iOSAndroidApplication: t('mockText_iOSAndroidApplication'),
      automationBot: t('mockText_automationBot'),
      designSystem: t('mockText_designSystem'),
      QAtesting: t('mockText_QAtesting'),
      APIintegration: t('mockText_APIintegration'),
    }
  }, [t])

  // Get the current mockText based on the selected tag or use default
  const currentMockText = useMemo(() => {
    // Make sure selectedTag is one of the valid keys
    if (selectedTag && tagKeys.includes(selectedTag)) {
      return mockTexts[selectedTag as keyof typeof mockTexts]
    }
    return mockTexts['privateAIassistant']
  }, [selectedTag, mockTexts, tagKeys])

  // Create a custom tag click handler that captures the tag key
  const handleTagButtonClick = useCallback(
    (tag: string) => {
      // Find the key for this tag by looking through the tagMapping
      const tagKey = Object.entries(tagMapping).find(
        ([_, value]) => value === tag,
      )?.[0]

      // Find the corresponding tagKey from the original tagKeys
      if (tagKey) {
        const keyIndex = tagsAnimate.findIndex(
          (animateTag) => animateTag === tagKey,
        )
        if (keyIndex >= 0 && keyIndex < tagKeys.length) {
          // Call the original handleTagClick with the tag value
          handleTagClick(tagKeys[keyIndex])
        }
      } else {
        // Fallback to original behavior if mapping not found
        handleTagClick(tag)
      }
    },
    [tagMapping, tagsAnimate, tagKeys, handleTagClick],
  )

  // Handle text changes from the textarea
  const handleTextChange = useCallback(
    (text: string) => {
      setCurrentText(text)
    },
    [setCurrentText],
  )

  // Add createJob function from AddJobChat.tsx
  const createJob = async () => {
    // Get the text from the textarea
    const textToSubmit = currentText || currentMockText

    if (!textToSubmit.trim()) {
      return // Don't submit empty descriptions
    }

    // Basic client-side validation
    if (textToSubmit.trim().length < 10) {
      addToast(
        'Please provide a more detailed job description.',
        ToastStatus.INVALID,
      )
      return
    }

    if (textToSubmit.length > 1500) {
      addToast(
        'Job description is too long. Please limit to 1500 characters.',
        ToastStatus.INVALID,
      )
      return
    }

    setIsLoading(true)

    try {
      // Use the combined server action that handles both analysis and job creation
      const response = await createJobFromDescriptionAction(textToSubmit)

      if (response.success && response.job) {
        // If job creation was successful, redirect to edit page
        router.push(`/jobs/${response.job.id}/edit`)
      } else {
        // Handle error based on the returned error details
        const errorMessage =
          response.reasoning || response.error || 'Error creating job'

        // Use a different toast type for rate limiting to make it more visible
        if (
          errorMessage.includes('Rate limit') ||
          errorMessage.includes('high demand')
        ) {
          addToast(`⚠️ ${errorMessage}`, ToastStatus.INVALID)
        } else {
          addToast(errorMessage, ToastStatus.INVALID)
        }

        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error calling server action:', error)
      // This should only happen for network errors or other unexpected issues
      addToast(
        'Error communicating with server. Please try again.',
        ToastStatus.INVALID,
      )
      setIsLoading(false)
    }
  }

  return (
    <>
      {isLoading && <HunterLoader />}
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
          onTextChange={handleTextChange}
        />

        <div className={styles.buttonSection}>
          <Button variant="primary" onClick={createJob} disabled={isLoading}>
            {isLoading ? t('buttonLoading') || 'Processing...' : t('button')}
          </Button>
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
              {((!isMobile && rowIndex === 0) ||
                (isMobile && rowIndex === 1)) && (
                <div className={styles.tooltipContainer}>
                  <TagTooltip isMobile={isMobile} />
                </div>
              )}
            </TagsRow>
          ))}
        </div>
      </div>
    </>
  )
}
