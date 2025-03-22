import { Loader } from '@/components/Loader/Loader'
import { I18nNamespaces } from '@/i18n/request'
import { useTranslations } from 'next-intl'

const Loading = () => {
  const t = useTranslations(I18nNamespaces.Index)
  return <Loader>{t('title')}</Loader>
}

export default Loading
