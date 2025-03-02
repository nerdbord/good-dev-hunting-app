import { I18nNamespaces } from '@/i18n/request'
import { Loader } from '@gdh/ui-system'
import { useTranslations } from 'next-intl'

const Loading = () => {
  const t = useTranslations(I18nNamespaces.Index)
  return <Loader>{t('title')}</Loader>
}

export default Loading
