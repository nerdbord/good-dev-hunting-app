import ModerationFilters from '@/app/(profile)/(components)/Filters/ModerationFilters'
import ModerationProfileList from '@/app/(profile)/(components)/ProfileList/ModerationProfileList'
import { ModerationFilterContextProvider } from '@/contexts/ModerationFilterContext'

const DashboardPage = () => {
  return (
    <ModerationFilterContextProvider>
      <ModerationFilters />
      <ModerationProfileList />
    </ModerationFilterContextProvider>
  )
}

export default DashboardPage
