import FiltersWithData from '@/components/Filters/FiltersWithData'
import ProfileList from '@/components/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'

export default function Home() {
  return (
    <FiltersProvider>
      <FiltersWithData />
      <ProfileList />
    </FiltersProvider>
  )
}
