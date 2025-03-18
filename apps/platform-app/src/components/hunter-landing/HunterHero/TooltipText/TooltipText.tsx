import styles from './TooltipText.module.scss'
import { useTranslations } from 'next-intl'
import { I18nNamespaces } from '@/i18n/request'

export const TooltipText = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)
  
  return (
    <div className={styles.tooltipText}>
      {t('heroTooltip')}
    </div>
  )
}


