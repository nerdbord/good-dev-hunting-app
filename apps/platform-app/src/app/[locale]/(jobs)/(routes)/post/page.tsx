import { I18nNamespaces } from '@/i18n/request'
import { getTranslations } from 'next-intl/server'
import PostJobForm from '../../(components)/PostJobForm/PostJobForm'

const PostJobPage = async () => {
  const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <div>
      <h1>{t('postJobTitle')}</h1>
      <PostJobForm />
    </div>
  )
}

export default PostJobPage
