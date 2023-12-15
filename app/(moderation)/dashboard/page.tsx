import ModerationFilters from '@/components/Filters/ModerationFilters'
import ModerationProfileList from '@/components/ProfileList/ModerationProfileList'
import { ModerationFilterContextProvider } from '@/contexts/ModerationFilterContext'

const DashboardPage = () => {
  return (
    <ModerationFilterContextProvider>
      {/* @ts-expect-error Server Component */}
      <ModerationFilters />
      {/* @ts-expect-error Server Component */}
      <ModerationProfileList />
    </ModerationFilterContextProvider>
  )
}
// elo
export default DashboardPage
