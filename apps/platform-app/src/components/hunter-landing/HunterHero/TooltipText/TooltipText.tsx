import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import styles from './TooltipText.module.scss'

export const TooltipText = () => {
  const t = useTranslations(I18nNamespaces.HunterHero)

  return <div className={styles.tooltipText}>{t('heroTooltip')}</div>
}
