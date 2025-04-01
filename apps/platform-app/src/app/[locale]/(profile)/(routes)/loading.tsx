import { AdvancedLoader } from '@/components/Loader'
import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'

export default async function Loading() {
  const t = await getTranslations(I18nNamespaces.Index)
  return <AdvancedLoader message={t('title')} />
}
