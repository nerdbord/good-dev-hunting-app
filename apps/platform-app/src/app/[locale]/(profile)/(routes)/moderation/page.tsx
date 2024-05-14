import ModerationFilters from '@/app/[locale]/(profile)/(components)/Filters/ModerationFilters'
import ModerationProfilesWithFilter from '@/app/[locale]/(profile)/(components)/ProfileList/ModerationProfilesWithFilter'

const DashboardPage = () => {
  return (
    <>
      <ModerationFilters />
      <ModerationProfilesWithFilter />
    </>
  )
}

export default DashboardPage
