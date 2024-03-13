import { DropdownFilters } from '@/app/(profile)/(components)/Filters/DropdownFilters'
import { TabFilters } from '@/app/(profile)/(components)/Filters/TabFilters'
import { getCountries } from '@/backend/country/country.service'
import { getUniqueSpecializations } from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { SearchBarWrapper } from '@/components/SearchBar/SearchBarWrapper'
import { mapOptions, mapSpecializations } from '../../mappers'
import styles from './Filters.module.scss'

export const FiltersWithData = async () => {
  const technologies = mapOptions(await getTechnologies())
  const countries = mapOptions(await getCountries())
  const specializations = mapSpecializations(await getUniqueSpecializations())

  return (
    <div className={styles.mainContainer}>
      <div className={styles.wrapper}>
        <DropdownFilters technologies={technologies} countries={countries} />
        <div className={styles.hideOnMobile}>
          <SearchBarWrapper />
        </div>
      </div>
      <TabFilters specializations={specializations} />
    </div>
  )
}
