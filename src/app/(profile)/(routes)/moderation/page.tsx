import ModerationFilters from '@/app/(profile)/(components)/Filters/ModerationFilters'
import ModerationProfilesWithFilter from '@/app/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'

const DashboardPage = () => {
  return (
    <>
      <ModerationFilters />
      <ModerationProfilesWithFilter />
    </>
  )
}

export default DashboardPage
