import { ProfileFilters } from '@/app/(profile)/(components)/Filters/ProfileFilters'
import { TabFilters } from '@/app/(profile)/(components)/Filters/TabFilters'
import { getCountries } from '@/backend/country/country.service'
import { getUniqueSpecializations } from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { mapOptions, mapSpecializations } from '../../mappers'
import styles from './Filters.module.scss'

export const FiltersWithData = async () => {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())
  const specializations = mapSpecializations(await getUniqueSpecializations())

  return (
    <div className={styles.mainContainer}>
      <ProfileFilters technologies={technologies} countries={countries} />
      <TabFilters specializations={specializations} />
    </div>
  )
}
