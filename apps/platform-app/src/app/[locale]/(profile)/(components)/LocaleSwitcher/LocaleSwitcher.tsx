'use client'
import { type HunterHeaderVariant } from '@/components/hunter-landing/HunterHeader/HunterHeader'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'
import { LocaleSwitcherSelect } from './LocaleSwitcherSelect'

export const LocaleSwitcher = ({
  variant,
}: {
  variant?: HunterHeaderVariant.HunterHeaderVariant
}) => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)

  return <LocaleSwitcherSelect label={t('label')} variant={variant} />
}
