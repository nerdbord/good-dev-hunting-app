import ModerationFilters from '@/app/(profile)/(components)/Filters/ModerationFilters'
import ModerationProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'
import { ModerationProvider } from '@/app/(profile)/_providers/Moderation.provider'

const DashboardPage = () => {
  return (
    <ModerationProvider>
      <ModerationFilters />
      <ModerationProfilesWithFilter />
    </ModerationProvider>
  )
}

export default DashboardPage
