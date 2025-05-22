'use client'
import { createJobFromDescriptionAction } from '@/app/[locale]/(jobs)/_actions/mutations/createJob'
import { ToastStatus, useToast } from '@/contexts/ToastContext'
import { I18nNamespaces } from '@/i18n/request'
import { Button } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HunterLoader } from '../../HunterLoader/HunterLoader'
import { TagsRow } from '../../UI/TagsRow/TagsRow'
import { TechIcon } from '../../UI/TechIcon/TechIcon'
import { useTagsAnimation } from '../../hooks/useTagsAnimation'
import { TagTooltip } from '../TagTooltip/TagTooltip'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [currentAnimatedTag, setCurrentAnimatedTag] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { addToast } = useToast()

  useEffect(() => {
    const checkMobile = () => {
      return window.innerWidth < 768
    }
    setIsMobile(checkMobile())
    const handleResize = () => {
      setIsMobile(checkMobile())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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

  const handleTagChange = useCallback((tag: string) => {
    setCurrentAnimatedTag(tag)
  }, [])

  const {
    selectedTag,
    tagMapping,
    handleTagClick,
    handleTextareaEmpty,
    getRows,
    currentText,
    setCurrentText,
  } = useTagsAnimation({ tagKeys, tags, tagsAnimate })

  const rows = useMemo(() => {
    if (isMobile === null) return [[]]
    return getRows(isMobile)
  }, [getRows, isMobile])

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

  const currentMockText = useMemo(() => {
    if (selectedTag && tagKeys.includes(selectedTag)) {
      return mockTexts[selectedTag as keyof typeof mockTexts]
    }
    return mockTexts['privateAIassistant']
  }, [selectedTag, mockTexts, tagKeys])

  const handleTagButtonClick = useCallback(
    (tag: string) => {
      const tagKey = Object.entries(tagMapping).find(
        ([_, value]) => value === tag,
      )?.[0]

      if (tagKey) {
        const keyIndex = tagsAnimate.findIndex(
          (animateTag) => animateTag === tagKey,
        )
        if (keyIndex >= 0 && keyIndex < tagKeys.length) {
          handleTagClick(tagKeys[keyIndex])
        }
      } else {
        handleTagClick(tag)
      }
    },
    [tagMapping, tagsAnimate, tagKeys, handleTagClick],
  )

  const handleTextChange = useCallback(
    (text: string) => {
      setCurrentText(text)
    },
    [setCurrentText],
  )

  const createJob = async () => {
    const textToSubmit = currentText
    //  || currentMockText

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
      const response = await createJobFromDescriptionAction(textToSubmit)

      if (response.success && response.job) {
        router.push(`/jobs/${response.job.id}/edit`)
      } else {
        const errorMessage =
          response.reasoning || response.error || 'Error creating job'

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
      addToast(
        'Error communicating with server. Please try again.',
        ToastStatus.INVALID,
      )
      setIsLoading(false)
    }
  }

  if (isMobile === null) {
    return <div className={styles.loading}></div>
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
              currentAnimatedTag={currentAnimatedTag}
              selectedTag={selectedTag}
              tagMapping={tagMapping}
              onTagClick={handleTagButtonClick}
            ></TagsRow>
          ))}
        </div>

        <div className={styles.tooltipContainer}>
          <TagTooltip isMobile={isMobile} />
        </div>
      </div>
    </>
  )
}
