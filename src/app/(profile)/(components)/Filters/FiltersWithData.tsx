import { mapOptions } from '@/app/(profile)/mappers'
import { getCountries } from '@/backend/country/country.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import Filters from './Filters'

export default async function FiltersWithData() {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())
  return <Filters technologies={technologies} countries={countries} />
}
