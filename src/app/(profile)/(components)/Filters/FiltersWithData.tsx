import { DropdownFilters } from '@/app/(profile)/(components)/Filters/DropdownFilters'
import { TabFilters } from '@/app/(profile)/(components)/Filters/TabFilters'
import { getCountries } from '@/backend/country/country.service'
import {
  countPublishedProfilesForPositions,
  getUniqueSpecializations,
} from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { mapOptions, mapSpecializations } from '../../mappers'

export default async function FiltersWithData() {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())
  const specializations = mapSpecializations(await getUniqueSpecializations())
  const counts = await countPublishedProfilesForPositions()

  return (
    <>
      <DropdownFilters technologies={technologies} countries={countries} />
      <TabFilters specializations={specializations} counts={counts} />
    </>
  )
}
