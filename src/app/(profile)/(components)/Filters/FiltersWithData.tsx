import { DropdownFilters } from '@/app/(profile)/(components)/Filters/DropdownFilters'
import { TabFilters } from '@/app/(profile)/(components)/Filters/TabFilters'
import { type JobOfferFiltersEnum } from '@/app/(profile)/types'
import { getCountries } from '@/backend/country/country.service'
import {
  countProfilesForPositionsByFilters,
  getUniqueSpecializations,
} from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { mapOptions, mapSpecializations } from '../../mappers'

export const FiltersWithData = async ({
  filters,
}: {
  filters: Record<JobOfferFiltersEnum, string>
}) => {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())
  const specializations = mapSpecializations(await getUniqueSpecializations())
  const counts = await countProfilesForPositionsByFilters(filters)

  return (
    <>
      <DropdownFilters technologies={technologies} countries={countries} />
      <TabFilters specializations={specializations} counts={counts} />
    </>
  )
}
