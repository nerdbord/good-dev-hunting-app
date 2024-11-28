'use client'
import { I18nNamespaces } from '@/i18n/request'
import { useLocale, useTranslations } from 'next-intl'
import { LocaleSwitcherSelect } from './LocaleSwitcherSelect'

export const LocaleSwitcher = () => {
  const t = useTranslations(I18nNamespaces.LocaleSwitcher)
  const locale = useLocale()

  return <LocaleSwitcherSelect defaultValue={locale} label={t('label')} />
}
