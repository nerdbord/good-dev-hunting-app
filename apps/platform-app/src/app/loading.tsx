// import { LoaderSwitcher } from '@/components/Loader/LoaderSwitcher'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

export default function Loading() {
  const t = useTranslations(I18nNamespaces.Index)

  // return <LoaderSwitcher message={t('loading')} />
  return <div>Loading...</div>
}
