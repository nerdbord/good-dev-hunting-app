import { AdvancedLoader } from '@/components/Loader'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations(I18nNamespaces.Index)

  return <AdvancedLoader message={t('loading')} />
}
