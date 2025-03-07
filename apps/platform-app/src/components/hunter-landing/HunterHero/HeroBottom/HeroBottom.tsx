'use client'
import { Button } from '@gdh/ui-system'
import { TextareaHero } from '../TextareaHero/TextareaHero'
import styles from './HeroBottom.module.scss'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

export const HeroBottom = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)

  const tags = [
    t('privateAIassistant'),
    t('website'),
    t('paymentSystemIntegration'),
    t('onlinePlatformDesign'),
    t('mobileApplication'),
    t('dataManagementSystem'),
    t('databaseMigration'),
    t('automation'),
    t('iOSAndroidApplication'),
    t('automationBot'),
    t('QAtesting'),
    t('APIintegration'),
  ]
  const tagsAnimate = ["automatyzacji", "migracji bazy danych", "integracji API", "testowania aplikacji", "budowy stron internetowych", "projektowania platform online", "integrowania systemów płatności", "tworzenia aplikacji mobilnych", "zarządzania danymi", "automatyzacji botów"]

  return (
    <div className={styles.bottomSection}>
      <TextareaHero tagsAnimate={tagsAnimate} />

      <Button variant="primary">{t('button')}</Button>

      <div className={styles.tagsSection}>
        {tags.map((tag, index) => (
          <button key={index} className={styles.tag}>{tag}</button>
        ))}
      </div>
    </div>
  )
}
