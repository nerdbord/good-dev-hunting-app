import ModerationFilters from '@/components/Filters/ModerationFilters'
import Modal from '@/components/Modal/Modal'
import ModerationProfileList from '@/components/ProfileList/ModerationProfileList'
import { ModerationFilterContextProvider } from '@/contexts/ModerationFilterContext'

const DashboardPage = () => {
  return (
    <ModerationFilterContextProvider>
      <Modal />
      {/* @ts-expect-error Server Component */}
      <ModerationFilters />
      {/* @ts-expect-error Server Component */}
      <ModerationProfileList />
    </ModerationFilterContextProvider>
  )
}

export default DashboardPage
