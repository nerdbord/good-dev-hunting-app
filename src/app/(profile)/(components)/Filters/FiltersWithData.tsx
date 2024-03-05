import { DropdownFilters } from '@/app/(profile)/(components)/Filters/DropdownFilters'
import { TabFilters } from '@/app/(profile)/(components)/Filters/TabFilters'
import { getCountries } from '@/backend/country/country.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { mapOptions } from '../../mappers'

export default async function FiltersWithData() {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())

  return (
    <>
      <DropdownFilters technologies={technologies} countries={countries} />
      <TabFilters />
    </>
  )
}
