import { ProfileFilters } from '@/app/[locale]/(profile)/(components)/Filters/ProfileFilters'
import { TabFilters } from '@/app/[locale]/(profile)/(components)/Filters/TabFilters'
import { getCountries } from '@/backend/country/country.service'
import { getUniqueSpecializations } from '@/backend/profile/profile.service'
import { getTechnologies } from '@/backend/technology/technology.service'
import { cache } from 'react'

import {
  mapOptions,
  mapSpecializations,
} from '@/app/[locale]/(profile)/profile.mappers'
import styles from './Filters.module.scss'

const tech = cache(getTechnologies)
const countries = cache(getCountries)
const specializations = cache(getUniqueSpecializations)

export const FiltersWithData = async () => {
  const mappedTech = mapOptions(await tech())
  const mappedCountries = mapOptions(await countries())
  const mappedSpecializations = mapSpecializations(await specializations())

  return (
    <div className={styles.mainContainer}>
      <ProfileFilters technologies={mappedTech} countries={mappedCountries} />
      <TabFilters specializations={mappedSpecializations} />
    </div>
  )
}
