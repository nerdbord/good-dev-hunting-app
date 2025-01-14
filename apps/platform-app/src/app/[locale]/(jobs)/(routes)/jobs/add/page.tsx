// import { I18nNamespaces } from '@/i18n/request'
// import { getTranslations } from 'next-intl/server'

import { AddJobTopBar } from './AddJobTopBar'
import { ChatUi } from './ChatUi'

const NewJobPage = async () => {
  // const t = await getTranslations(I18nNamespaces.Jobs)

  return (
    <>
      <AddJobTopBar />
      <ChatUi />
    </>
  )
}

export default NewJobPage
