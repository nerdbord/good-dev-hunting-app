import FiltersWithData from '@/app/(profile)/(components)/Filters/FiltersWithData'
import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { FiltersProvider } from '@/app/(profile)/providers/FilterProviders/FilterContext'

export default function Home() {
  return (
    <FiltersProvider>
      <FiltersWithData />
      <ProfileList />
    </FiltersProvider>
  )
}
