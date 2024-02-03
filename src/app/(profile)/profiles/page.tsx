import FiltersWithData from '@/app/(profile)/(components)/Filters/FiltersWithData'
import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { FiltersProvider } from '@/contexts/FilterContext'

export default function Home() {
  return (
    <FiltersProvider>
      <FiltersWithData />
      <ProfileList />
    </FiltersProvider>
  )
}
