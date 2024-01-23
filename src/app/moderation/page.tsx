import ModerationFilters from '@/components/Filters/ModerationFilters'
import ModerationProfileList from '@/components/ProfileList/ModerationProfileList'
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
