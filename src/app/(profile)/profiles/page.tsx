import FiltersWithData from '@/app/(profile)/(components)/Filters/FiltersWithData'
import ProfileList from '@/app/(profile)/(components)/ProfileList/ProfileList'
import { getPublishedProfilesByFilter } from '@/backend/profile/profile.service'
import { FiltersProvider } from '@/contexts/FilterContext'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string }
}) {
  console.log('searchParams from home: ', searchParams)

  const profiles = await getPublishedProfilesByFilter(searchParams)

  console.log('profiles from home: ', profiles)
  return (
    <FiltersProvider>
      <FiltersWithData />
      <ProfileList profiles={profiles} />
    </FiltersProvider>
  )
}
