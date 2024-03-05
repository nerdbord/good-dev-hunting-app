import { DropdownFilters } from '@/app/(profile)/(components)/Filters/DropdownFilters'
import { getCountries } from '@/backend/country/country.service'
import {
  getPublishedProfilesPayload,
  getUniqueSpecializations,
} from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { mapOptions, mapSpecializations } from '../../mappers'

export default async function FiltersWithData() {
  const profiles = await getPublishedProfilesPayload()
  const specializations = mapSpecializations(await getUniqueSpecializations())
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())

  return (
    // <Filters
    //   data={profiles}
    //   specializations={specializations}
    //   technologies={technologies}
    //   countries={countries}
    // />
    <>
      <DropdownFilters technologies={technologies} countries={countries} />
      {/* <TabFilters /> */}
    </>
  )
}
