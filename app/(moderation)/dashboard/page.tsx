import ModerationFilters from '@/components/Filters/ModerationFilters'
import ModerationProfileList from '@/components/ProfileList/ModerationProfileList'
import { ModerationFilterContextProvider } from '@/contexts/ModerationFilterContext'

const DashboardPage = () => {
  return (
    <ModerationFilterContextProvider>
      <ModerationFilters />
      {/* @ts-expect-error Server Component */}
      <ModerationProfileList />
    </ModerationFilterContextProvider>
  )
}

export default DashboardPage
