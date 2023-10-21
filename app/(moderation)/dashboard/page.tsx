import ModerationFilters from '@/components/Filters/ModerationFilters'
import ModerationProfileList from '@/components/ProfileList/ModerationProfileList'

const DashboardPage = () => {
  return (
    <>
      <ModerationFilters />
      {/* @ts-expect-error Server Component */}
      <ModerationProfileList />
    </>
  )
}

export default DashboardPage
