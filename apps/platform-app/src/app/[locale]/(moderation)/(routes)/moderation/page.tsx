import { ModerationFilters } from '@/app/[locale]/(moderation)/(components)/ModerationFilters/ModerationFilters'
import { ModerationProfileList } from '@/app/[locale]/(moderation)/(components)/ModerationProfileList/ModerationProfileList'

const ModerationPage = () => {
  return (
    <>
      <ModerationFilters />
      <ModerationProfileList />
    </>
  )
}

export default ModerationPage
